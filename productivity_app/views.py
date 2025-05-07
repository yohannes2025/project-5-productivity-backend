# views.py
from rest_framework import generics, viewsets, views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Task, Profile
from .serializers import TaskSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.exceptions import PermissionDenied


class ProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, editing, and deleting user profiles.
    Users can only edit or delete their own profile, but can view all profiles.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    # Allow GET for all, require auth for others
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Override get_queryset to allow authenticated users to see all profiles.
        Unauthenticated users can also see all profiles (due to IsAuthenticatedOrReadOnly).
        """
        return Profile.objects.all()

    def get_object(self):
        """
        Override get_object to only allow authenticated users to retrieve,
        update, or delete their own profile instance.
        """
        obj = super().get_object()
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            if obj.user != self.request.user:
                raise PermissionDenied(
                    "You do not have permission to edit or delete this profile.")
        return obj

    def perform_update(self, serializer):
        """
        Ensure the logged-in user is the owner of the profile being updated.
        """
        if serializer.instance.user != self.request.user:
            raise PermissionDenied(
                "You do not have permission to update this profile.")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Ensure the logged-in user is the owner of the profile being deleted.
        """
        if instance.user != self.request.user:
            raise PermissionDenied(
                "You do not have permission to delete this profile.")
        instance.delete()

    def perform_create(self, serializer):
        """
        Automatically link the profile to the logged-in user.
        """
        serializer.save(user=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Task instances.
    Users can only edit their own assigned tasks.
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override get_queryset to filter tasks based on the logged-in user.
        Users can only see tasks where they are assigned.
        """
        user = self.request.user
        return Task.objects.filter(assigned_users=user)

    def perform_update(self, serializer):
        """
        Override perform_update to ensure the logged-in user is assigned to the task.
        """
        task = self.get_object()
        if self.request.user not in task.assigned_users.all():
            raise PermissionDenied(
                "You do not have permission to edit this task.")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Override perform_destroy to ensure the logged-in user is assigned to the task.
        """
        if self.request.user not in instance.assigned_users.all():
            raise PermissionDenied(
                "You do not have permission to delete this task.")
        instance.delete()

    def perform_create(self, serializer):
        """
        Automatically assign the logged-in user to the created task.
        """
        serializer.save(assigned_users=[self.request.user])


class UsersListAPIView(views.APIView):
    """
    A view to list all users (profiles are viewed through the ProfileViewSet).
    Requires authentication.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class RegisterViewSet(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


class LoginViewSet(views.APIView):
    """
    Handles user login.
    """

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
