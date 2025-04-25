# models.py
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class UserProfile(models.Model):
    """
    Extends the built-in User model to include additional profile information,
    such as avatar, display name, and user-specific settings.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='profile',
        help_text="The user this profile belongs to"
    )
    created_at = models.DateTimeField(
        auto_now_add=True, help_text="Profile creation timestamp")
    updated_at = models.DateTimeField(
        auto_now=True, help_text="Profile last updated timestamp")
    name = models.CharField(max_length=255, blank=True,
                            help_text="Display name for the user")
    # Allows null and blank values
    file = models.FileField(upload_to='uploads/', null=True, blank=True)
    settings = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user}"


# Signal to auto-create a UserProfile when a new User is created
def create_userprofile(sender, instance, created, **kwargs):
    """
    Signal handler that creates a UserProfile when a new User instance is created.
    """
    if created:
        UserProfile.objects.create(user=instance)


# Connect the signal to the User model
post_save.connect(create_userprofile, sender=User)
