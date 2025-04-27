from rest_framework import viewsets
from .models import Task, Profile
from .serializers import TaskSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class ProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Profile instances.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
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
