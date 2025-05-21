# tests/test_serializers.py
import pytest
from productivity_app.serializers import TaskSerializer
from django.utils import timezone
from datetime import timedelta


def test_task_serializer_valid_data(db, create_user):
    data = {
        'title': 'Task',
        'description': 'Details',
        'due_date': str(timezone.now().date() + timedelta(days=1)),
        'priority': 'high',
        'category': 'development',
        'status': 'pending',
        'assigned_users': [create_user.id]
    }
    serializer = TaskSerializer(data=data)
    assert serializer.is_valid()
