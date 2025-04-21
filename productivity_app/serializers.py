# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task, Settings, Category, Priority, TaskStatus, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class TaskSerializer(serializers.ModelSerializer):
    assigned_users = UserSerializer(many=True, read_only=True)
    # To show owner details as a serialized user
    owner = UserSerializer(read_only=True)
    category = serializers.ChoiceField(
        choices=[('production', 'Production'), ('maintenance', 'Mainenance'), ('marketing', 'Marketing'), ('sales', 'Sales'), ('human resour')])
    priority = serializers.ChoiceField(
        choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')])
    status = serializers.ChoiceField(choices=[(
        'pending', 'Pending'), ('in progress', 'In Progress'), ('completed', 'Completed')])

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'due_date',
            'created_at',
            'updated_at',
            'category',
            'priority',
            'status',
            'assigned_users',
            'owner',
            'file'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = '__all__'


class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'
