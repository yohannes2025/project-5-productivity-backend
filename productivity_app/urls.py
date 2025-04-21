# productivity_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, ProfileViewSet, SettingsViewSet, CategoryViewSet, PriorityViewSet, TaskStatusViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'categories', CategoryViewSet)
router.register(r'priorities', PriorityViewSet)
router.register(r'task-statuses', TaskStatusViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'settings', SettingsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
