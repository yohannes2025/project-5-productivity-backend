# productivity_app/serializers.py
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from .models import Task, Profile

# Get the active User model
User = get_user_model()

# ==========================
# Task Management Serializers
# ==========================


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for the Task model."""
    # Field to handle the Many-to-Many relationship with User for assigned users
    assigned_users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Task
        # Fields to include in the serialized representation
        fields = [
            'id', 'title', 'description', 'due_date', 'priority', 'category',
            'status', 'assigned_users', 'upload_files', 'created_at',
            'updated_at', 'is_overdue'
        ]
        # Fields that are read-only (automatically generated or properties)
        read_only_fields = ['created_at', 'updated_at', 'is_overdue']

    def create(self, validated_data):
        """Custom create method to handle the Many-to-Many relationship."""
        # Extract assigned users data before creating the task
        assigned_users_data = validated_data.pop('assigned_users', [])

        # Create the Task instance
        task = Task.objects.create(**validated_data)

        # Set the assigned users for the task
        task.assigned_users.set(assigned_users_data)

        return task

    def update(self, instance, validated_data):
        """Custom update method to handle partial updates and relationships."""
        # Extract assigned users data if provided
        assigned_users_data = validated_data.pop('assigned_users', None)

        # Update standard fields
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.category = validated_data.get('category', instance.category)
        instance.status = validated_data.get('status', instance.status)

        # Handle file upload updates (including clearing the file)
        if 'upload_files' in validated_data:
            new_file = validated_data['upload_files']
            if new_file is None:
                if instance.upload_files:
                    instance.upload_files.delete(save=False)
                instance.upload_files = None

            else:
                instance.upload_files = new_file

        # Update assigned users if the field was provided in the request
        if assigned_users_data is not None:
            instance.assigned_users.set(assigned_users_data)

        # Save the instance
        instance.save()

        return instance

# ==========================
# Authentication & User Serializers
# ==========================


class UserSerializer(serializers.ModelSerializer):
    """Basic Serializer for the User model."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    # Extra fields for registration form
    confirm_password = serializers.CharField(
        write_only=True, label="Confirm Password")
    # Input field for display name/username
    name = serializers.CharField(label='Name', required=True)
    email = serializers.EmailField(label='Email', required=True)

    class Meta:
        model = User
        # Fields expected in the request data for registration
        fields = ('name', 'email', 'password', 'confirm_password')
        # Configure password to be write-only
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        """Custom validation for registration data."""
        # Check if passwords match
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Passwords must match."})

        # Validate password strength
        self.validate_password_strength(attrs['password'])

        # Check if username (derived from name) is already taken
        username_to_check = attrs.get('name')
        if username_to_check and User.objects.filter(username=username_to_check).exists():
            raise serializers.ValidationError(
                {"name": "A user with this username already exists."})

        # Check if email is already registered
        email_to_check = attrs.get('email')
        if email_to_check and User.objects.filter(email=email_to_check).exists():
            raise serializers.ValidationError(
                {"email": "A user with this email address already exists."})

        return attrs

    def validate_password_strength(self, password):
        """Validates the strength of the password."""
        min_length = 8

        if len(password) < min_length:
            raise serializers.ValidationError(
                {"password": f"Password must be at least {min_length} characters long."})

    def create(self, validated_data):
        """Custom create method to handle user and profile creation."""
        confirm_password = validated_data.pop('confirm_password')
        name = validated_data.pop('name')  # Get the name for username/profile

        # Create the User instance using create_user (handles password hashing)
        user = User.objects.create_user(
            username=name,  # Using 'name' input as the username
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Update the Profile's name field created by signal
        try:
            profile = user.profile
            profile.name = name
            profile.save()
        except Profile.DoesNotExist:
            pass  # Should not happen if signal is configured

        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    email = serializers.EmailField()  # login is by email
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """Custom validation for login credentials."""
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError(
                'Email and password are required.', code='authorization')

        # Authenticate the user
        user = authenticate(request=self.context.get(
            'request'), username=email, password=password)

        if not user:
            raise serializers.ValidationError(
                'Invalid credentials.', code='authorization')

        # Check if the account is active
        if not user.is_active:
            raise serializers.ValidationError(
                'User account is disabled.', code='authorization')

        # Add the authenticated user to the validated data
        attrs['user'] = user
        return attrs

# ==========================
# Profile Serializer
# ==========================


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the Profile model."""
    class Meta:
        model = Profile
        # Fields to include in the serialized representation
        fields = ['id', 'name', 'email', 'created_at', 'updated_at']
        # Fields that are read-only
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        """Custom output representation for the Profile."""
        # Displays limited user/profile data
        if instance.user:
            return {
                'id': instance.user.id,  # User ID
                'Name': instance.name,  # Profile name
                'Email': instance.user.email,  # User email
            }
        return {}  # Handle cases with no linked user
