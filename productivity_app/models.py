from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.utils import timezone

# ==========================
# Task Management Models
# ==========================


class Task(models.Model):
    """
    Represents a task that can be assigned to one or more users.
    Includes metadata like due date, priority, and optional file attachments.
    """
    STATE_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]

    task_title = models.CharField(
        max_length=255, help_text="Title of the task")
    task_description = models.TextField(
        help_text="Detailed description of the task")
    due_date = models.DateField(help_text="Deadline for the task")
    priority = models.CharField(
        max_length=20,
        choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')],
        help_text="Priority level of the task"
    )
    category = models.CharField(
        max_length=100, blank=True, null=True, help_text="Optional category for grouping tasks"
    )
    status = models.CharField(
        max_length=20,
        choices=STATE_CHOICES,
        default='pending',
        help_text="Current state of the task"
    )
    assigned_users = models.ManyToManyField(
        User,
        related_name='assigned_tasks',
        help_text="Users assigned to this task"
    )
    upload_files = models.FileField(
        upload_to='task_files',
        blank=True,
        null=True,
        help_text="Optional file attachment related to the task"
    )
    created_at = models.DateTimeField(
        auto_now_add=True, help_text="Date and time when the task was created"
    )
    updated_at = models.DateTimeField(
        auto_now=True, help_text="Date and time when the task was last updated"
    )

    @property
    def is_overdue(self):
        """
        Check if the task is overdue based on the current date.
        """
        return timezone.now().date() > self.due_date

    def __str__(self):
        return self.title


class Profile(models.Model):
    """
    Extends the built-in User model to include additional profile information,
    such as email, display name, and user-specific other information.
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
        auto_now_add=True, help_text="Profile creation timestamp"
    )
    updated_at = models.DateTimeField(
        auto_now=True, help_text="Profile last updated timestamp"
    )
    email = models.EmailField(
        max_length=254, unique=True, null=True, blank=True)
    name = models.CharField(max_length=255, blank=True,
                            help_text="Display name for the user")
    other_info = models.CharField(max_length=255, blank=True,
                                  help_text="Additional infromation")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user}"


# Signal to auto-create a Profile when a new User is created
def create_profile(sender, instance, created, **kwargs):
    """
    Signal handler that creates a Profile when a new User instance is created.
    """
    if created:
        Profile.objects.create(user=instance)


# Connect the signal to the User model
post_save.connect(create_profile, sender=User)
