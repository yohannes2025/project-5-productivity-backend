# # """drf_api URL Configuration

# # The `urlpatterns` list routes URLs to views. For more information please see:
# #     https://docs.djangoproject.com/en/3.2/topics/http/urls/
# # Examples:
# # Function views
# #     1. Add an import:  from my_app import views
# #     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# # Class-based views
# #     1. Add an import:  from other_app.views import Home
# #     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# # Including another URLconf
# #     1. Import the include() function: from django.urls import include, path
# #     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# # """
# # # from django.contrib import admin
# # # from django.urls import path, include
# # # from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# # # from productivity_app.views import RegisterView
# # # from django.views.generic import RedirectView

# # # urlpatterns = [
# # #     path('admin/', admin.site.urls),
# # #     path('api-auth/', include('rest_framework.urls')),
# # #     path('api/', include('productivity_app.urls')),
# # #     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
# # #     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# # #     path('register/', RegisterView.as_view(), name='register'),
# # #     path('api/register/', RegisterView.as_view(), name='register'),
# # #     path('', RedirectView.as_view(url='/api/', permanent=False)),
# # # ]

# # # drf_api/urls.py
# # from django.urls import include, path
# # from rest_framework.routers import DefaultRouter
# # from productivity_app.views import TaskViewSet, UserViewSet

# # router = DefaultRouter()
# # router.register(r'tasks', TaskViewSet)
# # router.register(r'users', UserViewSet)

# # urlpatterns = [
# #     path('', include(router.urls)),
# # ]


# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('productivity_app.urls')),
#     # For browsable API login
#     path('api-auth/', include('rest_framework.urls')),
# ]


# from django.urls import path, include
# from django.contrib import admin
# # from rest_framework.routers import DefaultRouter
# # from productivity_app.views import TaskViewSet, UserProfileViewSet

# # router = DefaultRouter()
# # router.register(r'tasks', TaskViewSet)
# # router.register(r'profiles', UserProfileViewSet)

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('productivity_app.urls')),
#     # path('', include(router.urls)),
# ]
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('productivity_app.urls')),
]
