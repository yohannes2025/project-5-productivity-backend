def test_jwt_token_flow(api_client, create_user):
    login = api_client.post('/api/login/', {
        'email': create_user.email,
        'password': 'securepassword'
    })
    assert login.status_code == 200
    token = login.data['access']
    verify = api_client.post('/api/token/verify/', {'token': token})
    assert verify.status_code == 200
