# productivity_app/urls.py
from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from .views import LoginViewSet, TaskViewSet, ProfileViewSet, RegisterViewSet, UsersListAPIView

# router = DefaultRouter()
# router.register(r'tasks', TaskViewSet, basename='task')
# router.register(r'profiles', ProfileViewSet, basename='profile')

urlpatterns = [
    path('api/tasks/', TaskViewSet.as_view(), name='task-list'),
    path('api/tasks/<int:pk>/', TaskViewSet.as_view(), name='task-detail'),
    path('api/profiles/', ProfileViewSet.as_view(), name='profile-list'),
    path('api/profiles/<int:pk>/', ProfileViewSet.as_view(), name='profile-detail'),
    path('api/register/', RegisterViewSet.as_view(), name='register'),
    path('api/login/', LoginViewSet.as_view(), name='login'),
    path('api/users/', UsersListAPIView.as_view(), name='users-list'),
    # path('api-auth/', include('rest_framework.urls')),
    # path('api/dj-rest-auth/registration/',
    #      include('dj_rest_auth.registration.urls')),
    # path('api/dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('api/', include(router.urls)
    # path('api/', include('productivity_app.urls')),
    # path('api-auth/', include('rest_framework.urls')),
    # path('api/dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('api/dj-rest-auth/', include('dj_rest_auth.urls')),
]
