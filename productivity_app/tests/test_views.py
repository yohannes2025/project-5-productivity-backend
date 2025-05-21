# tests/test_views.py



def test_user_can_register(api_client):
    response = api_client.post('/api/register/', {
        'username': 'newuser',
        'email': 'new@example.com',
        'password': 'securepassword'
    })
    assert response.status_code == 201


def test_user_can_login(api_client, create_user):
    response = api_client.post('/api/login/', {
        'email': create_user.email,
        'password': 'securepassword'
    })
    assert 'access' in response.data


def test_get_tasks_authenticated(api_client, create_user):
    login = api_client.post('/api/login/', {
        'email': create_user.email,
        'password': 'securepassword'
    })
    token = login.data['access']
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    response = api_client.get('/api/tasks/')
    assert response.status_code == 200
