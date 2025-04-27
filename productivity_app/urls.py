# productivity_app/urls.py
from django.urls import path
from .views import TaskViewSet, ProfileViewSet  # Import the ProfileViewSet

urlpatterns = [
    path('tasks/',
         TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('profiles/', ProfileViewSet.as_view(
        {'get': 'list', 'post': 'create'}), name='profile-list'),  # Add this line
]
