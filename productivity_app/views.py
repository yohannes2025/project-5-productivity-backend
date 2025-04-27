# models.py
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task, Profile
from .serializers import TaskSerializer, ProfileSerializer, RegisterSerializer
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication


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


# class RegisterViewSet(generics.CreateAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


class RegisterViewSet(generics.CreateAPIView):
    """
    Handles user registration.
    Only allows POST method.
    """
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        """
        Override create to customize the response.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
