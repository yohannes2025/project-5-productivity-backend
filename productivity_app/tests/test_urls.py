from django.test import SimpleTestCase
from django.urls import reverse, resolve
from productivity_app.views import TaskViewSet


from django.test import SimpleTestCase
from django.urls import reverse, resolve


class UrlsTestCase(SimpleTestCase):
    def test_task_list_url(self):
        url = reverse('productivity_app:task-list')
        # The resolved view_name includes the namespace prefix
        self.assertEqual(resolve(url).view_name, 'productivity_app:task-list')

    def test_register_url(self):
        url = reverse('productivity_app:register')
        self.assertEqual(url, '/api/register/')  # Keep the expected path as is
