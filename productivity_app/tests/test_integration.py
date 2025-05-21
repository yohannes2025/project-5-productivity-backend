def test_create_and_retrieve_task(self):
    create_url = reverse('productivity_app:task-list')
    data = {
        'title': 'Integration Task',
        'description': 'Created via integration test',
        'priority': 'medium',
        'status': 'pending',
        'due_date': '2099-12-31',  # valid future date
        'assigned_users': [self.user.id]
    }
    response = self.client.post(create_url, data)
    print("RESPONSE:", response.data)  # Optional: debug output

    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    response = self.client.get(create_url)
    self.assertEqual(len(response.data), 1)
    self.assertEqual(response.data[0]['title'], 'Integration Task')
