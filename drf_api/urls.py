# drf_api/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('', root_route),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-dj-auth/logout_route'),
    path('api-dj-rest-auth/', include('dj_rest_auth.urls')),
    path('api-dj-rest/registration/', include('dj_rest_auth.registration.urls')),
    path('api/, include('productivity_app.urls')),   
]

handler404 = TemplateView.as_view(template_name='index.html')
