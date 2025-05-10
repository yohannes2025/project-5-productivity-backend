# drf_api/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    # path('api/dj-rest-auth/logout/', logout_route),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('productivity_app.urls')),
    path('api/dj-rest-auth/', include('dj_rest_auth.urls')),
    path('api/dj-rest-auth/registration/',
         include('dj_rest_auth.registration.urls')),
    path('api/', include('productivity_app.urls')),
]

handler404 = TemplateView.as_view(template_name='index.html')


# path('api/register/', RegisterViewSet.as_view(), name='register'),
# path('api/login/', LoginViewSet.as_view(), name='login'),
# path('api/', include(router.urls)),
# path('api/users/', UsersListAPIView.as_view(), name='users-list'),
