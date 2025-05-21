# tests/test_models.py
import pytest
from django.utils import timezone
from productivity_app.models import Task, Profile
from datetime import timedelta
from django.core.exceptions import ValidationError


def test_task_creation(db, create_user):
    task = Task.objects.create(
        title="Sample Task",
        description="Test description",
        due_date=timezone.now().date() + timedelta(days=1),
        priority="medium",
        status="pending",
        created_by=create_user
    )
    task.assigned_users.set([create_user])
    assert task.title == "Sample Task"
    assert not task.is_overdue


def test_due_date_cannot_be_past(db):
    with pytest.raises(ValidationError):
        Task(
            title="Past Task",
            description="Invalid",
            due_date=timezone.now().date() - timedelta(days=1),
            priority="low",
            status="pending"
        ).full_clean()


def test_profile_created_on_user_creation(db):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    user = User.objects.create_user(username='user2', password='pass')
    assert hasattr(user, 'profile')
