from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import Task, Profile
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'email', 'file',
                  'other_info', 'created_at', 'updated_at']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_instance = User.objects.create(**user_data)
        profile = Profile.objects.create(
            user=user_instance, **validated_data)
        return profile

    def to_representation(self, instance):
        """Override to_representation to customize output"""
        user_data = {
            'id': instance.user.id,  # User ID
            'Name': instance.name,  # Profile name
            'Email': instance.user.email,  # User email
            'Attachment': instance.file.url if instance.file else None,  # File URL if available
            'Other Info': instance.other_info,  # Other info from the Profile
        }
        return user_data


class TaskSerializer(serializers.ModelSerializer):
    assigned_users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True
    )

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'priority', 'category',
                  'assigned_users', 'files', 'state', 'created_at', 'updated_at', 'is_overdue']

    def create(self, validated_data):
        # Automatically set overdue field
        task = Task.objects.create(**validated_data)
        return task

    def update(self, instance, validated_data):
        # Update the task instance with provided data
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.category = validated_data.get('category', instance.category)
        instance.state = validated_data.get('state', instance.state)

        # Handle file updates if provided
        if 'files' in validated_data:
            instance.files = validated_data['files']

        # Save the assigned users
        if 'assigned_users' in validated_data:
            instance.assigned_users.set(validated_data['assigned_users'])

        instance.save()
        return instance


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(
        write_only=True, label="Confirm Password")
    name = serializers.CharField(label='Name', required=True)
    email = serializers.EmailField(label='Email')

    class Meta:
        model = User
        fields = ('name', 'email', 'password', 'confirm_password')

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # Remove confirm_password

        # Check if the username already exists
        if User.objects.filter(username=validated_data['name']).exists():
            raise serializers.ValidationError(
                {"name": "A user with this username already exists."})

        user = User(
            username=validated_data['name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Passwords must match."})
        return attrs
