from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from rest_framework import serializers, generics
from .models import Task, Profile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


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
        fields = ['id', 'task_title', 'task_description', 'due_date', 'priority', 'category',
                  'assigned_users', 'upload_files', 'status', 'created_at', 'updated_at', 'is_overdue']

    def create(self, validated_data):
        # Automatically set overdue field
        task = Task.objects.create(**validated_data)
        return task

    def update(self, instance, validated_data):
        # Update the task instance with provided data
        instance.task_title = validated_data.get(
            'task_title', instance.task_title)
        instance.task_description = validated_data.get(
            'task_description', instance.task_description)
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.category = validated_data.get('category', instance.category)
        instance.status = validated_data.get('status', instance.status)

        # Handle file updates if provided
        if 'upload_files' in validated_data:
            instance.upload_files = validated_data['upload_files']

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
        # Check if the passwords match
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Passwords must match."})

        # Validate password strength
        self.validate_password_strength(attrs['password'])

        return attrs

    def validate_password_strength(self, password):
        """Check the strength of the password."""
        min_length = 8  # Example minimum length

        if len(password) < min_length:
            raise serializers.ValidationError(
                {"password": f"Password must be at least {min_length} characters long."})


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError(
                'Must include "email" and "password".'
            )

        user = authenticate(request=self.context.get(
            'request'), username=email, password=password)

        if not user:
            raise serializers.ValidationError('Invalid email or password.')

        if not user.is_active:
            raise serializers.ValidationError("User account is inactive.")

        attrs['user'] = user
        return attrs
