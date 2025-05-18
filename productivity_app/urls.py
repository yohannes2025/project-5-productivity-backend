# productivity_app/serializers.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginViewSet, TaskViewSet, ProfileViewSet, RegisterViewSet, UsersListAPIView, UserDetailAPIView


app_name = "productivity_app"

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'profiles', ProfileViewSet, basename='profile')

urlpatterns = [
    path('api/register/', RegisterViewSet.as_view(), name='register'),
    path('api/login/', LoginViewSet.as_view(), name='login'),
    path('api/', include(router.urls)),
    path('api/users/', UsersListAPIView.as_view(), name='users-list'),
    path('users/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
]
