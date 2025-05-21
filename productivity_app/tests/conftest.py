# tests/conftest.py
import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def create_user(db):
    user = User.objects.create_user(
        username='testuser', email='test@example.com', password='securepassword')
    return user
