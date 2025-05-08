# # productivity_app/utils.py
# import os
# import requests


# def fetch_external_api_data():
#     api_token = os.environ.get('API_TOKEN')
#     headers = {
#         "Authorization": f"Bearer {api_token}"
#     }
#     response = requests.get(
#         "project-5-productivity-backend-1b67e4c3722a.herokuapp.com", headers=headers)
#     # Handle errors as needed
#     response.raise_for_status()
#     return response.json()

import os
import requests


def fetch_external_api_data():
    # Retrieve the API token from environment variable
    api_token = os.environ.get('API_TOKEN')

    api_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NzAzNDc3LCJpYXQiOjE3NDY3MDMxNzcsImp...'

    if not api_token:
        raise ValueError("API_TOKEN environment variable not set.")

    headers = {
        "Authorization": f"Bearer {api_token}"
    }

    response = requests.get(
        "project-5-productivity-backend-1b67e4c3722a.herokuapp.com", headers=headers)

    # Check for HTTP errors
    response.raise_for_status()

    # Return the JSON data
    return response.json()
