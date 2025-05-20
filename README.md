# 📅 Productivity App Project Backend

![productivity_app](./staticfiles/build/static/images/productivity_app.png)

## Table of contents

* [Project goals](#project-goals)
* [Planning](#planning)
+ [Data models](#data-models)
  - [**Category**](#category)
  - [**Priority**](#priority)
  - [**TaskStatus**](#taskstatus)
  - [**Task**](#task)
  - [**UsrProfile**](#userprofile)
  - [**Settings**](#settings)
  - [**Attachment**](#attachment)
* [API endpoints](#api-endpoints)
* [Frameworks, libraries and dependencies](#frameworks--libraries-and-dependencies)
    + [django-cloudinary-storage](#django-cloudinary-storage)
    + [dj-allauth](#dj-allauth)
    + [dj-rest-auth](#dj-rest-auth)
    + [djangorestframework-simplejwt](#djangorestframework-simplejwt)
    + [dj-database-url](#dj-database-url)
    + [psychopg2](#psychopg2)
    + [python-dateutil](#python-dateutil)
    + [django-recurrence](#django-recurrence)
    + [django-filter](#django-filter)
    + [django-cors-headers](#django-cors-headers)
* [Testing](#testing)
    + [Manual testing](#manual-testing)
    + [Automated tests](#automated-tests)
    + [Python validation](#python-validation)
    + [Resolved bugs](#resolved-bugs)
      - [Bugs found while testing the API in isolation](#bugs-found-while-testing-the-api-in-isolation)
      - [Bugs found while testing the React front-end](#bugs-found-while-testing-the-react-front-end)
    + [Unresolved bugs](#unresolved-bugs)
* [Deployment](#deployment)
* [Credits](#credits)
---
## Project Goals
This project provides a Django Rest Framework API for the [Productivity App Project](https://github.com/yohannes2025/pp5_productivity_app_frontend).

The **Productivity App** project focuses on developing a **calendar-driven application** designed to help users organize their time efficiently. This **browser-based platform** allows users to create and manage **tasks and habits** effectively.
This application is built to ensure a **seamless user experience** in maintaining daily productivity through a clean, intuitive interface and smart task organization tools.

## Planning
Planning started by creating epics and user stories for the frontend application, based on the project goals. The user stories were used to inform wireframes mapping out the intended functionality and 'flow' through the app. See the [repo for the frontend React app](https://github.com/yohannes2025/pp5_productivity_app_frontend) for more details.

The user stories requiring implementation to achieve a minimum viable product (MVP) were then mapped to API endpoints required to support the desired functionality.

## Data Models
### Category Model

* Represents a category for tasks.
* **Fields:**
    * `name`: `CharField(max_length=100)` - The name of the category (e.g., "Work", "Personal").
* **`__str__` method:** Returns the name of the category, making it human-readable in the Django admin and other contexts.

### Priority Model

* Represents the priority level of a task.
* **Fields:**
    * `name`: `CharField(max_length=50)` - The name of the priority level (e.g., "High", "Medium", "Low").
    * `level`: `IntegerField(help_text="Lower number = higher priority")` - An integer representing the priority level. A lower number indicates a higher priority.
* **`__str__` method:** Returns a string combining the priority name and its level (e.g., "High (1)").

### TaskStatus Model

* Represents the status of a task.
* **Fields:**
    * `name`: `CharField(max_length=50)` - The name of the task status (e.g., "Pending", "In Progress", "Completed").
* **`__str__` method:** Returns the name of the task status.

### Task Model

* Represents a single task in the application.
* **Fields:**
    * `title`: `CharField(max_length=200)` - The title of the task.
    * `description`: `TextField(blank=True, null=True)` - A more detailed description of the task. Allows for empty or null values.
    * `due_date`: `DateField()` - The date when the task is due.
    * `created_at`: `DateTimeField(auto_now_add=True)` - Automatically set to the current time when the task is created.
    * `updated_at`: `DateTimeField(auto_now=True)` - Automatically updated to the current time whenever the task is saved.
    * `category`: `ForeignKey(Category, on_delete=models.SET_NULL, null=True)` - A foreign key relationship to the `Category` model. If a category is deleted, the `category` field of associated tasks will be set to `NULL`. Allows for tasks without a category.
    * `priority`: `CharField(max_length=20, choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')])` - The priority of the task, chosen from predefined options.
    * `status`: `CharField(max_length=20, choices=[('pending', 'Pending'), ('in progress', 'In Progress'), ('completed', 'Completed')])` - The current status of the task, chosen from predefined options.
    * `assigned_users`: `ManyToManyField(User, related_name='assigned_tasks')` - A many-to-many relationship with the built-in `User` model. Allows multiple users to be assigned to a single task, and a user can be assigned to multiple tasks. The `related_name` allows accessing tasks assigned to a user via `user.assigned_tasks`.
    * `owner`: `ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)` - A foreign key relationship to the user who created the task. Uses the `AUTH_USER_MODEL` setting for flexibility. If the owner user is deleted, all their tasks will be deleted (`on_delete=models.CASCADE`). Allows for tasks without an explicit owner (though this might need consideration based on application logic).
    * `file`: `FileField(upload_to='attachments/', blank=True, null=True)` - Allows uploading a file attachment to the task. Files will be stored in the `attachments/` directory within the media root. Allows for no file to be uploaded.
* **`__str__` method:** Returns the title of the task.

### UserProfile Model

* Represents additional profile information for users. Note that this is a separate model from the built-in `User` model.
* **Fields:**
    * `name`: `CharField(max_length=100)` - The name of the user profile.
    * `avatar`: `ImageField(upload_to='avatars/', null=True, blank=True)` - Allows uploading an avatar image for the user. Images will be stored in the `avatars/` directory within the media root. Allows for no avatar to be uploaded.
* **`__str__` method:** Returns the name associated with the user profile.

### Settings Model

* Represents user-specific settings.
* **Fields:**
    * `user`: `OneToOneField(User, on_delete=models.CASCADE, default=1)` - A one-to-one relationship with the built-in `User` model. Each user will have exactly one settings object. If the associated user is deleted, their settings will also be deleted. The `default=1` might need to be reviewed as it assumes a default user with ID 1 exists. It's generally better to handle initial settings creation differently (e.g., via signals).
    * `theme`: `CharField(max_length=50, default='light')` - The user's preferred theme. Defaults to 'light'.
    * `notifications_enabled`: `BooleanField(default=True)` - Indicates whether notifications are enabled for the user. Defaults to `True`.
* **`__str__` method:** Returns the username of the associated user.

# API Endpoints Table

| Endpoint                      | Method | Description                                                                 |
|-------------------------------|--------|-----------------------------------------------------------------------------|
| `/api/categories/`            | GET    | Retrieve a list of all categories.                                        |
| `/api/categories/`            | POST   | Create a new category (requires `name` in request body).                  |
| `/api/categories/<id>/`       | GET    | Retrieve a specific category by its ID.                                   |
| `/api/categories/<id>/`       | PUT/PATCH | Update an existing category (requires `name` in request body).            |
| `/api/categories/<id>/`       | DELETE | Delete a specific category.                                               |
| `/api/priorities/`            | GET    | Retrieve a list of all priority levels.                                   |
| `/api/priorities/`            | POST   | Create a new priority level (requires `name` and `level` in request body). |
| `/api/priorities/<id>/`       | GET    | Retrieve a specific priority level by its ID.                              |
| `/api/priorities/<id>/`       | PUT/PATCH | Update an existing priority level (requires `name` and `level` in body).   |
| `/api/priorities/<id>/`       | DELETE | Delete a specific priority level.                                         |
| `/api/taskstatuses/`          | GET    | Retrieve a list of all task statuses.                                     |
| `/api/taskstatuses/`          | POST   | Create a new task status (requires `name` in request body).               |
| `/api/taskstatuses/<id>/`     | GET    | Retrieve a specific task status by its ID.                                |
| `/api/taskstatuses/<id>/`     | PUT/PATCH | Update an existing task status (requires `name` in request body).          |
| `/api/taskstatuses/<id>/`     | DELETE | Delete a specific task status.                                            |
| `/api/tasks/`                 | GET    | Retrieve a list of all tasks (supports filtering and pagination).         |
| `/api/tasks/`                 | POST   | Create a new task (requires relevant fields in request body).            |
| `/api/tasks/<id>/`            | GET    | Retrieve a specific task by its ID.                                      |
| `/api/tasks/<id>/`            | PUT/PATCH | Update an existing task (requires fields to update in request body).      |
| `/api/tasks/<id>/`            | DELETE | Delete a specific task.                                                 |
| `/api/userprofiles/`          | GET    | Retrieve a list of all user profiles.                                   |
| `/api/userprofiles/`          | POST   | Create a new user profile (requires `name` and optionally `avatar`).      |
| `/api/userprofiles/<id>/`     | GET    | Retrieve a specific user profile by its ID.                              |
| `/api/userprofiles/<id>/`     | PUT/PATCH | Update an existing user profile (requires `name` and optionally `avatar`). |
| `/api/userprofiles/<id>/`     | DELETE | Delete a specific user profile.                                         |
| `/api/settings/`              | GET    | Retrieve settings for the currently authenticated user.                   |
| `/api/settings/`              | PUT/PATCH | Update settings for the currently authenticated user (requires fields).    |
| `/api/users/<user_id>/settings/` | GET    | Retrieve settings for a specific user (admin/specific user access).      |
| `/api/users/<user_id>/settings/` | PUT/PATCH | Update settings for a specific user (admin/specific user access).      |
| `/api/attachments/`           | GET    | Retrieve a list of all attachments.                                     |
| `/api/attachments/`           | POST   | Upload a new attachment (requires `file` in `multipart/form-data`).     |
| `/api/attachments/<id>/`      | GET    | Retrieve a specific attachment by its ID.                               |
| `/api/attachments/<id>/`      | DELETE | Delete a specific attachment.                                           |


## Frameworks, libraries and dependencies
The Productivity API is implemented in Python using [Django](https://www.djangoproject.com) and [Django Rest Framework](https://django-filter.readthedocs.io/en/stable/).

The following additional utilities, apps and modules were also used.

### django-cloudinary-storage
https://pypi.org/project/django-cloudinary-storage/

Enables cloudinary integration for storing user profile images in cloudinary.

### dj-allauth
https://django-allauth.readthedocs.io/en/latest/

Used for user authentication. this package enables registration and authentication using a range of social media accounts.

### dj-rest-auth
https://dj-rest-auth.readthedocs.io/en/latest/introduction.html

Provides REST API endpoints for login and logout. 

### djangorestframework-simplejwt
https://django-rest-framework-simplejwt.readthedocs.io/en/latest/

Provides JSON web token authentication.

### dj-database-url
https://pypi.org/project/dj-database-url/

Creates an environment variable to configure the connection to the database.

### psychopg2
https://pypi.org/project/psycopg2/

Database adapater to enable interaction between Python and the PostgreSQL database.

### python-dateutil
https://pypi.org/project/python-dateutil/

This module provides extensions to the standard Python datetime module. It is a pre-requisite for django-recurrence library.

### django-recurrence
https://django-recurrence.readthedocs.io/en/latest/

This utility enables functionality for working with recurring dates in Django. It provides a `ReccurenceField` field type for storing recurring datetimes in the database.

### django-filter
https://django-filter.readthedocs.io/en/stable/

django-filter is used to implement ISO datetime filtering functionality for the `events` GET endpoint. The client is able to request dates within a range using the `from_date` and `to_date` URL parameters. The API performs an additional check after filtering to 'catch' any repeat events within the requested range, where the original event stored in the database occurred beforehand.

### django-cors-headers
https://pypi.org/project/django-cors-headers/

This Django app adds Cross-Origin-Resource Sharing (CORS) headers to responses, to enable the API to respond to requests from origins other than its own host.
Productivity App is configured to allow requests from all origins, to facilitate future development of a native mobile app using this API.



## Deployment

### Heroku

The Productivity API is deployed to Heroku, using PostgreSql database.
To duplicate deployment to Heroku, follow these steps:

- Description of the deployment process using Heroku.
- Fork or clone this repository in GitHub.
- You will need a Cloudinary account to host user profile images.
- Login to Cloudinary.
- Select the 'dashboard' option.
- Copy the value of the 'API Environment variable' from the part starting `cloudinary://` to the end. You may need to select the eye icon to view the full environment variable. Paste this value somewhere for safe keeping as you will need it shortly (but destroy after deployment).
- Log in to Heroku.
- Select 'Create new app' from the 'New' menu at the top right.
- Enter a name for the app and select the appropriate region.
- Select 'Create app'.
- Select 'Settings' from the menu at the top.
- Login to ElephantSQL.
- Click 'Create new instance' on the dashboard.
- Name the 'plan' and select the 'Tiny Turtle (free)' plan.
- Select 'select region'.
- Choose the nearest data centre to your location.
- Click 'Review'.
- Go to the ElephantSQL dashboard and click on the 'database instance name' for this project.
- Copy the ElephantSQL database URL to your clipboard (this starts with `postgres://`).
- Return to the Heroku dashboard.
- Select the 'settings' tab.
- Locate the 'reveal config vars' link and select.
- Enter the following config var names and values:
    - `CLOUDINARY_URL`: *your cloudinary URL as obtained above*
    - `DATABASE_URL`: *your ElephantSQL postgres database URL as obtained above*
    - `SECRET_KEY`: *your secret key*
    - `ALLOWED_HOST`: *the url of your Heroku app (but without the `https://` prefix)*
- Select the 'Deploy' tab at the top.
- Select 'GitHub' from the deployment options and confirm you wish to deploy using GitHub. You may be asked to enter your GitHub password.
- Find the 'Connect to GitHub' section and use the search box to locate your repo.
- Select 'Connect' when found.
- Optionally choose the main branch under 'Automatic Deploys' and select 'Enable Automatic Deploys' if you wish your deployed API to be automatically redeployed every time you push changes to GitHub.
- Find the 'Manual Deploy' section, choose 'main' as the branch to deploy and select 'Deploy Branch'.
- Your API will shortly be deployed and you will be given a link to the deployed site when the process is complete.

## Testing

### Manual testing

### Automated tests

### Python validation

## Credits

### Resolved bugs

#### Bugs found while testing the API in isolation

#### Bugs found while testing the React front-end
### Unresolved bugs


## Credits
### Acknowledgments

- Thank you very much Code Institute Student Care Team Tutor and Mentor for your dedication and commitment in supporting me to achieve in submitting this Advanced Front-End Full Stack Software Development project and broadening my career opportunities.
