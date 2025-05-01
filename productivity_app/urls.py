# productivity_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginViewSet, TaskViewSet, ProfileViewSet, RegisterViewSet, UsersListAPIView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'profiles', ProfileViewSet, basename='profile')
# router.register(r'users', TaskViewSet, basename='users-list')

urlpatterns = [
    path('api/register/', RegisterViewSet.as_view(), name='register'),
    path('api/login/', LoginViewSet.as_view(), name='login'),
    path('api/', include(router.urls)),
    path('api/users/', UsersListAPIView.as_view(), name='users-list'),
]
