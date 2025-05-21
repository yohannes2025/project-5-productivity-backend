# tests/test_permissions.py
from productivity_app.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import SAFE_METHODS


class DummyRequest:
    def __init__(self, method, user):
        self.method = method
        self.user = user


class DummyObject:
    def __init__(self, created_by):
        self.created_by = created_by


def test_is_owner_or_read_only_permission():
    request = DummyRequest('GET', user='user1')
    obj = DummyObject(created_by='user2')
    permission = IsOwnerOrReadOnly()
    assert permission.has_object_permission(request, None, obj)

    request = DummyRequest('PUT', user='user1')
    obj = DummyObject(created_by='user1')
    assert permission.has_object_permission(request, None, obj)
