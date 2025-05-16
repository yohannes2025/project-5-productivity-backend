# # productivity_app/permissions.py

# from rest_framework import permissions


# class IsOwnerOrReadOnly(permissions.BasePermission):
#     """
#     Custom permission to only allow owners of an object to edit or delete it.
#     Assumes the model instance has an 'user' attribute.
#     """

#     def has_object_permission(self, request, view, obj):
#         # Read permissions are allowed to any authenticated request,
#         # so we'll always allow GET, HEAD or OPTIONS requests.
#         if request.method in permissions.SAFE_METHODS:
#             return request.user and request.user.is_authenticated

#         # Write permissions are only allowed to the owner of the snippet.
#         return obj.user == request.user

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAssignedOrReadOnly(BasePermission):
    """
    Allows read-only access to anyone.
    Allows modification only if the user is authenticated and assigned to the task.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user in obj.assigned_users.all()
