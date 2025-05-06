# models.py
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task, Profile
from .serializers import TaskSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
# from productivity_app.auth import LoginView, LogoutView
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from .serializers import UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()  # This is the base queryset

    def get_queryset(self):
        user = self.request.user

        # Check if the user is authenticated
        if user.is_authenticated:
            return self.queryset.filter(user=user)
        else:
            # Optionally return an empty queryset or raise an error
            return Profile.objects.none()  # Return an empty queryset

    # def list(self, request, *args, **kwargs):
    #     # override the list method to handle the unauthorized case
    #     if not request.user.is_authenticated:
    #         return Response({'error': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)


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


class UsersListAPIView(views.APIView):
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


class LoginViewSet(APIView):
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
