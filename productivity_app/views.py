# productivity_app/views.py

# Third-party imports
from rest_framework import generics, viewsets, views, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)

from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

# Django imports
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import transaction

# Local application imports
from .models import Profile, Task
from .permissions import IsAssignedOrReadOnly, IsSelfOrReadOnly
from .serializers import (
    TaskSerializer,
    ProfileSerializer,
    RegisterSerializer,
    LoginSerializer,
    UserSerializer
)


# Get the active User model
User = get_user_model()

# ==========================
# Profile ViewSet
# ==========================


class ProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user profiles.
    Users can view all profiles, but can only edit or delete their own profile.
    Profile creation is handled during user registration via a signal.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()  # Base queryset for lookup
    # Allow GET for all, require auth for others (PUT, PATCH, DELETE)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Override get_queryset to allow authenticated users to see all profiles.
        Unauthenticated users can also see all profiles
        (due to IsAuthenticatedOrReadOnly).
        """
        return Profile.objects.all()  # Return the base queryset

    def get_object(self):
        """
        Override get_object to only allow authenticated users to retrieve,
        update, or delete their own profile instance.
        For retrieve (GET), it allows access if authorized by
        permission_classes.
        For update/delete (PUT, PATCH, DELETE), it enforces ownership.
        """
        obj = super().get_object()
        # Check ownership for update/delete methods
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            # Ensure user is authenticated before checking ownership
            if (
                self.request.user.is_authenticated and
                obj.user != self.request.user
            ):
                raise PermissionDenied(
                    "You do not have permission"
                    "to edit or delete this profile."
                )

            return obj

    def perform_update(self, serializer):
        """
        Ensure the logged-in user is the owner of the profile being updated.
        """

        if (
                self.request.user.is_authenticated and
                serializer.instance.user != self.request.user
        ):
            raise PermissionDenied(
                "You do not have permission to update this profile.")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Ensure the logged-in user is the owner of the profile being deleted.
        Note: Deleting a profile might implicitly delete the user depending on
        the ForeignKey configuration (on_delete=CASCADE). Consider if this is
        the desired behavior.
        """
        if (
            self.request.user.is_authenticated
            and instance.user != self.request.user
        ):
            raise PermissionDenied(
                "You do not have permission to delete this profile."
            )

        instance.delete()

# ==========================
# Task ViewSet
# ==========================


class TaskViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting Task instances.
    Users can only see and edit tasks where they are assigned.
    """
    serializer_class = TaskSerializer
    # Only authenticated users can interact
    permission_classes = [IsAssignedOrReadOnly]
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Task.objects.filter(assigned_users=user).distinct()
        return Task.objects.all()

    def perform_create(self, serializer):
        """
        Automatically assign the logged-in user to the created task.
        If assigned_users are not provided in the request,
        assign the creating user.
        """
        task = serializer.save()
        if not task.assigned_users.exists():
            task.assigned_users.set([self.request.user])

    def perform_update(self, serializer):
        """
        Override perform_update to ensure the logged-in user
        is assigned to the task before allowing the update.
        """
        task = self.get_object()
        # Check if the requesting user is assigned to the task
        if self.request.user not in task.assigned_users.all():
            raise PermissionDenied(
                "You do not have permission to edit this task.")

        serializer.save()

    def perform_destroy(self, instance):
        """
        Override perform_destroy to ensure the logged-in user
        is assigned to the task before allowing deletion.
        """
        # Check if the requesting user is assigned to the task
        if self.request.user not in instance.assigned_users.all():
            raise PermissionDenied(
                "You do not have permission to delete this task.")
        instance.delete()

# ==========================
# User List View
# ==========================


class UsersListAPIView(views.APIView):
    """
    A view to list all users.
    Requires authentication to see the list.
    """
    permission_classes = [
        IsAuthenticated]  # Only authenticated users can list users

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Allows users to retrieve, update, or delete their own profile.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsSelfOrReadOnly]

    def get_object(self):
        # Return the current authenticated user instance only
        return self.request.user

# ==========================
# Authentication Views
# ==========================


class RegisterViewSet(generics.CreateAPIView):
    """
    Handles user registration.
    """
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        """
        Handle POST request for user registration.
        Uses a transaction to ensure atomicity (user and profile creation).
        """
        with transaction.atomic():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            # Call perform_create to create the user
            user = self.perform_create(serializer)

            refresh = RefreshToken.for_user(user)
            response_data = {
                'message': 'User registered successfully',
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        """
        Custom perform_create to return the created user instance.
        """
        return serializer.save()


class LoginViewSet(views.APIView):
    """
    Handles user login and token generation.
    """

    def post(self, request, *args, **kwargs):
        """
        Handle POST request for user login.
        """
        serializer = LoginSerializer(
            data=request.data, context={'request': request})

        serializer.is_valid(raise_exception=True)

        # If valid, the user is in validated_data
        user = serializer.validated_data['user']

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        # Return tokens in the response
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)
