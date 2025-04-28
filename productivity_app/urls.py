# productivity_app/urls.py
from django.urls import path
# Import the ProfileViewSet
from .views import LoginViewSet, TaskViewSet, ProfileViewSet, RegisterViewSet

urlpatterns = [
    path('api/register/', RegisterViewSet.as_view(), name='register'),
    path('api/login/', LoginViewSet.as_view(), name='login'),
    path('api/tasks/',
         TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('api/profiles/', ProfileViewSet.as_view(
        {'get': 'list', 'post': 'create'}), name='profile-list'),
]
