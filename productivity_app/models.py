# productivity_app/models.py

# Importing necessary modules from Django
from django.db import models
from django.db.models.signals import post_save
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()


# ==========================
# Task Management Models
# ==========================


class Task(models.Model):
    """
    Represents a task that can be assigned to one or more users.
    Includes metadata like due date, priority, and optional file attachments.
    """
    # Choices for the 'status' field
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]

    # Choices for the 'category' field
    CATEGORY_CHOICES = [
        ('development', 'Development'),
        ('design', 'Design'),
        ('testing', 'Testing'),
        ('documentation', 'Documentation'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateField()
    priority = models.CharField(
        max_length=20,
        choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')]
    )
    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        blank=True,
        null=True
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    # Many-to-Many relationship with the User model
    assigned_users = models.ManyToManyField(
        User, related_name='assigned_tasks')
    # upload_files = models.FileField(
    #     upload_to='task_files', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def is_overdue(self):
        """Checks if the task's due date is in the past."""
        return (
            timezone.now().date() > self.due_date
            if self.due_date else False
        )

    def __str__(self):
        """String representation of the Task model."""
        return self.title


class File(models.Model):
    """Represents a file uploaded for a Task."""
    task = models.ForeignKey(
        Task, related_name='upload_files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='task_files')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.name}"


class Profile(models.Model):
    """
    Extends the built-in User model with additional profile information.
    Uses a OneToOneField to link each Profile to a User.
    """
    # One-to-One relationship with the User model
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='profile'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    email = models.EmailField(
        max_length=254, unique=True, null=True, blank=True)
    name = models.CharField(max_length=255, blank=True)

    class Meta:
        """Meta options for the Profile model."""
        ordering = [
            '-created_at']  # Default ordering by creation date (descending)

    def __str__(self):
        """String representation of the Profile model."""
        return f"{self.user}" if self.user else "Profile"


# Signal handler to create a Profile when a new User is created
def create_profile(sender, instance, created, **kwargs):
    """Creates a Profile for a newly created User."""
    if created:
        Profile.objects.create(user=instance)


# Connect the signal to the User model
post_save.connect(create_profile, sender=User)
