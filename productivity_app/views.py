# models.py
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task, Profile
from .serializers import TaskSerializer, ProfileSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
# from productivity_app.auth import LoginView, LogoutView
from django.contrib.auth import get_user_model, authenticate


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


class RegisterViewSet(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


# class RegisterViewSet(generics.CreateAPIView):
#     """
#     Handles user registration.
#     Only allows POST method.
#     """
#     serializer_class = RegisterSerializer

#     def create(self, request, *args, **kwargs):
#         """
#         Override create to customize the response.
#         """
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


# class LoginViewSet(generics.CreateAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         user = authenticate(request, username=email, password=password)

#         if user is not None:
#             # Create JWT tokens
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# class LoginViewSet(generics.CreateAPIView):
#     serializer_class = LoginSerializer

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']

#         # Create JWT tokens
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key})


# class LoginViewSet(APIView):
#     """
#     Handles user login.
#     """

#     def post(self, request, *args, **kwargs):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         # Authenticate the user
#         user = authenticate(username=email, password=password)

#         if user:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# class LoginViewSet(APIView):
#     """
#     Handles user login.
#     """

#     def post(self, request, *args, **kwargs):
#         serializer = LoginSerializer(
#             data=request.data, context={'request': request})
#         if serializer.is_valid():
#             user = serializer.validated_data['user']
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

# class LoginViewSet(APIView):
#     """
#     Handles user login.
#     """

#     def post(self, request, *args, **kwargs):
#         serializer = LoginSerializer(
#             data=request.data, context={'request': request})
#         if serializer.is_valid():
#             user = serializer.validated_data['user']
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)


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
