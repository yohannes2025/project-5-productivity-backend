from rest_framework import viewsets
from .models import Task, UserProfile
from .serializers import TaskSerializer, UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing UserProfile instances.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    # permission_classes = [IsAuthenticated]
    # Enable token authentication
    # authentication_classes = [TokenAuthentication]


class TaskViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Task instances.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # permission_classes = [IsAuthenticated]
    # Enable token authentication
    # authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        serializer.save()
