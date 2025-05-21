# 📅 Productivity App Project Backend

![productivity_app](./staticfiles/build/static/images/productivity_app.png)

The **Productivity App** project focuses on developing a **calendar-driven application** designed to help users organize their time efficiently. This **browser-based platform** allows users to create and manage **tasks and habits** effectively.
This application is built to ensure a **seamless user experience** in maintaining daily productivity through a clean, intuitive interface and smart task organization tools.

[View the website here](https://project-5-productivity-frontend.onrender.com/)

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
Planning started by creating epics and user stories for the frontend application, based on the project goals. The user stories were used to inform wireframes mapping out the intended functionality and 'flow' through the app. See the [repo for the frontend React app](https://github.com/yohannes2025/project-5-productivity-frontend) for more details.

The user stories requiring implementation to achieve a minimum viable product (MVP) were then mapped to API endpoints required to support the desired functionality.

# productivity\_app/models.py
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



# API Endpoints Table

| Endpoint                      | Method | Description                                                                 |
|-------------------------------|--------|-----------------------------------------------------------------------------|
 status.                                            |
| `/api/tasks/`                 | GET    | Retrieve a list of all tasks (supports filtering and pagination).         |
| `/api/tasks/`                 | POST   | Create a new task (requires relevant fields in request body).            |
| `/api/tasks/<id>/`            | GET    | Retrieve a specific task by its ID.                                      |
| `/api/tasks/<id>/`            | PUT/PATCH | Update an existing task (requires fields to update in request body).      |
| `/api/tasks/<id>/`            | DELETE | Delete a specific task.                                                 |
| `/api/profiles/`          | GET    | Retrieve a list of all user profiles.                                   |
| `/api/profiles/`          | POST   | Create a new user profile (requires `name` and optionally `avatar`).      |
| `/api/profiles/<id>/`     | GET    | Retrieve a specific user profile by its ID.                              |
| `/api/profiles/<id>/`     | PUT/PATCH | Update an existing user profile (requires `name` and optionally `avatar`). |
| `/api/profiles/<id>/`     | DELETE | Delete a specific user profile.                                         |

| `/api/users/` | GET    | Retrieve authorized users list.      |
| `/api/users/me/` | PUT/PATCH | Update settings for a specific user (admin/specific user access).      |
 


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


productivity\_app/serializers.py
================================

This file defines the **serializers** for the productivity application. Serializers play a crucial role in Django Rest Framework by converting complex data types, such as Django model instances, into native Python datatypes that can then be easily rendered into JSON, XML, or other content types. They also provide deserialization, allowing parsed data to be converted back into complex types and then validated before saving to the database.

Task Management Serializers
---------------------------

### FileSerializer

This serializer handles the serialization and deserialization of **file uploads** associated with tasks. It exposes the id and file fields of the File model.

### UserSerializer

A basic serializer for the Django **User** model, primarily used to display user id, username, and email in read-only contexts, such as when listing users assigned to a task.

### TaskSerializer

This is the primary serializer for the **Task** model. It's designed for creating, updating, and retrieving individual task details. Key features include:

*   **assigned\_users**: Handles the many-to-many relationship with the User model, allowing tasks to be assigned to multiple users. It uses PrimaryKeyRelatedField for writing (sending user IDs) and is integrated with custom create and update methods to manage this relationship properly.
    
*   **upload\_files**: A read-only field that nests the FileSerializer to display associated file details when a task is retrieved.
    
*   **read\_only\_fields**: Automatically generated fields like created\_at, updated\_at, and the is\_overdue property are set as read-only.
    
*   **Custom create and update methods**: These methods are overridden to correctly handle the assignment of users, ensuring that the many-to-many relationship is properly set up or updated after the task itself is created or modified.
    

### TaskListSerializer

A simplified serializer for listing **Task** instances. It includes a subset of fields (id, title, description, due\_date, priority, category, status, created\_at, updated\_at) optimized for displaying tasks in a list view without excessive detail.

### TaskDetailSerializer

Provides a more detailed view for a single **Task**. It includes all fields from the Task model and explicitly nests UserSerializer for assigned\_users to show full user details. It also provides an assigned\_user\_ids field, which is write\_only, allowing you to update assigned users using their IDs while keeping the assigned\_users field read-only and displaying the full user objects.

Authentication & User Serializers
---------------------------------

### RegisterSerializer

Handles the **user registration** process. This serializer validates and creates new User and Profile instances. It includes:

*   **confirm\_password**: An extra write-only field to ensure password confirmation.
    
*   **name**: Used as the username for the new user and to populate the Profile's name field.
    
*   **email**: The user's email address, which must be unique.
    
*   **Custom validate method**: Performs several checks:
    
    *   Ensures password and confirm\_password match.
        
    *   Validates password strength using Django's built-in validate\_password.
        
    *   Checks for existing usernames and email addresses to prevent duplicates.
        
*   **Custom create method**: Creates a new User using create\_user (which handles password hashing) and then updates the associated Profile instance, utilizing the signal defined in models.py.
    

### LoginSerializer

Manages the **user login** process. This serializer validates user credentials (email and password) and authenticates the user.

*   It takes email and password as input.
    
*   The **validate method** checks if both fields are provided, verifies if a user exists with the given email, and then uses user.check\_password() to validate the provided password against the hashed password in the database.
    
*   It also checks if the user account is active.
    

Profile Serializer
------------------

### ProfileSerializer

This serializer handles the serialization and deserialization of the **Profile** model.

*   It includes fields like id, name, email, created\_at, and updated\_at.
    
*   The to\_representation method is customized to output a simplified representation of the profile, specifically including the user's id, name, and email from the linked User model.


productivity\_app/views.py
================================

This `views.py` file defines the API endpoints for managing user profiles, tasks, and authentication. It utilizes Django REST Framework's viewsets, generic views, and permissions to create a secure and organized API structure.

---

## 1. **ProfileViewSet**

**Purpose:**  
Provides CRUD operations for user profiles.  
- Public can view all profiles.  
- Only authenticated users can modify (update/delete) their own profile.

**Key Features:**  
- Uses `ModelViewSet` for standard actions (`list`, `retrieve`, `update`, `destroy`).  
- Enforces permissions: users can only modify their own profile.  
- Overrides `get_object`, `perform_update`, and `perform_destroy` to restrict modifications to the owner.

---

## 2. **TaskViewSet**

**Purpose:**  
Manages tasks, allowing users to view, create, update, or delete tasks they are assigned to.

**Key Features:**  
- Uses `ModelViewSet` for full CRUD operations.  
- Permissions: only assigned users can edit or delete tasks (`IsAssignedOrReadOnly`).  
- `get_queryset`: returns tasks assigned to the current user, or all tasks (if not authenticated).  
- `perform_create`: automatically assigns the creating user if no other users are assigned.  
- `perform_update` & `perform_destroy`: ensure only assigned users can modify or delete tasks.

---

## 3. **User List and Detail APIs**

### `UsersListAPIView`
- **Purpose:** List all registered users.  
- **Access:** Only authenticated users.  
- **Implementation:** Simple `APIView` with `GET` method returning serialized user data.

### `UserDetailAPIView`
- **Purpose:** Retrieve, update, or delete the current user's profile.  
- **Permissions:** User must be authenticated and can only modify their own data (`IsSelfOrReadOnly`).  
- **Implementation:** Extends `RetrieveUpdateDestroyAPIView` with `get_object` returning `request.user`.

---

## 4. **Authentication Endpoints**

### `RegisterViewSet`
- **Purpose:** Handles user registration.  
- **Implementation:** `CreateAPIView` that accepts registration data, creates a user (atomically), and returns JWT tokens.  
- Uses `transaction.atomic()` to ensure user creation is all-or-nothing.  
- On success, responds with success message, user info, and JWT tokens (`refresh` and `access`).

### `LoginViewSet`
- **Purpose:** Handles user login.  
- **Implementation:** `APIView` with POST method.  
- Validates credentials via `LoginSerializer`.  
- If valid, generates JWT tokens and returns them, enabling authenticated sessions.

---

## **Summary**

This `views.py` provides a comprehensive API for:
- Managing user profiles with proper permissions.
- Secure task management, ensuring only assigned users can modify tasks.
- User registration and login with JWT token-based authentication.
- Listing all users and retrieving/updating the current user's profile.

The design prioritizes security (permissions), atomic operations (registration), and user-centric access control, making it suitable for collaborative productivity applications.


productivity\_app/urls.py
================================

This `urls.py` file primarily configures URL routing and JWT token endpoints for the API. It does not define serializers but sets up the URL patterns to connect views with URLs, enabling the API to handle user registration, login, token management, and CRUD operations for tasks and profiles.

---

## 1. **Router Configuration**

- **`DefaultRouter()`**:  
  Creates a router that automatically generates URL patterns for viewsets.

- **`router.register(r'tasks', TaskViewSet, basename='task')`**:  
  Registers the `TaskViewSet`, enabling RESTful URLs for task operations (list, retrieve, create, update, delete).

- **`router.register(r'profiles', ProfileViewSet, basename='profile')`**:  
  Registers the `ProfileViewSet` for profile-related endpoints.

---

## 2. **URL Patterns**

Defines all API endpoints for the application:

### Authentication and User Management
- **Registration**:  
  `path('api/register/', RegisterViewSet.as_view(), name='register')`  
  Endpoint for user registration.

- **Login**:  
  `path('api/login/', LoginViewSet.as_view(), name='login')`  
  Endpoint for user login, returning JWT tokens.

### JWT Token Endpoints (using `rest_framework_simplejwt`)
- **Obtain Token**:  
  `path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair')`  
  Retrieves access and refresh tokens upon login.

- **Refresh Token**:  
  `path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')`  
  Refreshes expired access tokens using a refresh token.

- **Verify Token**:  
  `path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify')`  
  Validates the provided JWT token.

### Viewsets and Additional Endpoints
- **Task and Profile Endpoints**:  
  `path('api/', include(router.urls))`  
  Includes all URLs generated by the router for `tasks` and `profiles`.

- **User List**:  
  `path('api/users/', UsersListAPIView.as_view(), name='users-list')`  
  Lists all registered users.

- **Current User Details**:  
  `path('api/users/me/', UserDetailAPIView.as_view(), name='user-detail')`  
  Retrieves, updates, or deletes the current authenticated user's profile.

---

## **Summary**

- Sets up URL routing for user registration, login, and JWT token management.
- Registers viewsets for task and profile CRUD operations.
- Provides endpoints to list all users and access the current user's profile.
- Uses Django REST Framework's router for clean, RESTful URL patterns.

This configuration ensures a structured, secure, and extendable API for the productivity app.


dfr\_api/urls.py
================================

This `urls.py` file configures the URL routing for the Django project. It directs incoming HTTP requests to appropriate views or includes other URL configurations.

---

## 1. **Home View**

- **Function `home(request)`**:  
  Returns a simple JSON response with a welcome message.  
  - **Path `'/'`**:  
    When users visit the root URL of the site, they receive this JSON message:  
    ```json
    {"message": "Welcome to the Productivity App API"}
    ```

## 2. **URL Patterns**

- **Root Path `'/'`**:  
  Mapped to the `home` view, providing a friendly API welcome message.

- **Admin Path `'admin/'`**:  
  Provides access to Django's built-in admin interface at `/admin/`.

- **API Paths**:  
  - **`path('', include('productivity_app.urls', namespace='productivity_app'))`**:  
    Includes all URL patterns defined in the `productivity_app/urls.py` file under the root URL.  
    This means all API endpoints like `/api/register/`, `/api/login/`, `/api/tasks/`, `/api/profiles/`, etc., are accessible directly under the site's base URL.

---

## **Summary**

- Sets up a welcome endpoint at `'/'` that returns a JSON message.
- Connects the Django admin interface at `/admin/`.
- Includes the application's API URL configurations from `productivity_app/urls.py`.
  
This setup ensures that the main project URL routing is clean, organized, and user-friendly, directing API traffic appropriately and providing a simple landing message.


Deployment
================================

# Overcoming Deployment Challenges: From Heroku to Render.com

---

Deploying the final project for my **Advanced Front-End portfolio** presented an unexpected hurdle. My initial strategy was to deploy the application to **Heroku**, a platform I had used previously. However, I encountered persistent **network errors** that prevented a successful deployment, despite investing a significant amount of time troubleshooting.

After considerable effort with Heroku yielded no success, I made the decision to switch deployment platforms to **Render.com**. This transition, while necessary, required a considerable amount of time to adjust settings and configurations to suit the new environment.

Crucially, **last week, a Code Institute staff member sent me a Render.com manual**. This alternative solution to Heroku deployment proved invaluable, and I am very thankful for it. The moment my project successfully deployed to Render.com was a **great relief**. It marked the culmination of significant effort and a successful navigation of unforeseen technical difficulties.

#  Deploying a Django REST Framework Backend to Render.com

## Prerequisites

Before deploying, ensure:

* You have a working **Django REST Framework (DRF)** project.
* Your project is on **GitHub** or **GitLab**.
* You have a `requirements.txt` file.
* Your project uses a virtual environment.
* You’ve created a free account on [Render](https://render.com/).

---

## Step 1: Prepare Your Django Project for Deployment

### 1.1. Create `requirements.txt`

```bash
pip freeze > requirements.txt
```

### 1.2. Install Gunicorn

```bash
pip install gunicorn
```

Make sure `gunicorn` is added to your `requirements.txt`.

---

### 1.3. (Optional) Create a `render.yaml` for Infrastructure as Code

```yaml
services:
  - type: web
    name: drf-api
    env: python
    plan: free
    buildCommand: "pip install -r requirements.txt"
    startCommand: "gunicorn your_project_name.wsgi:application"
    envVars:
      - key: DJANGO_SETTINGS_MODULE
        value: your_project_name.settings
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: false
```

> Replace `your_project_name` with the name of your Django project directory.

---

### 1.4. Update `settings.py` for Production

#### Add Allowed Hosts:

```python
ALLOWED_HOSTS = ['your-service-name.onrender.com']
```

#### Add Static File Config:

```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

---

### 1.5. Collect Static Files

```bash
python manage.py collectstatic
```

---

##  Step 2: Push Your Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

---

##  Step 3: Deploy to Render

1. Go to [Render.com](https://render.com/) and log in.
2. Click **“New +” → “Web Service”**.
3. Connect your GitHub repository.
4. Fill out deployment settings:

| Field         | Value                                         |
| ------------- | --------------------------------------------- |
| Name          | drf-api (or any name)                         |
| Environment   | Python                                        |
| Build Command | `pip install -r requirements.txt`             |
| Start Command | `gunicorn your_project_name.wsgi:application` |

5. Add the following environment variables:

```
DJANGO_SETTINGS_MODULE = your_project_name.settings
SECRET_KEY = your-secret-key
DEBUG = false
```

---

##  Step 4: (Optional) Add a PostgreSQL Database on Render

1. Go to **“New +” → “PostgreSQL”** in Render.
2. Name it and choose a free plan.
3. Copy the **Internal Database URL**.
4. Update `settings.py`:

```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(default=os.getenv('DATABASE_URL'))
}
```

Install `dj-database-url`:

```bash
pip install dj-database-url
```

---

##  Step 5: Apply Migrations and Collect Static Files on Render

Use the **Shell** in the Render dashboard:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

---

## Step 6: Access Your Live API

Visit:

```
https://your-service-name.onrender.com/
```

Make sure your API routes (e.g. `/api/`) are configured in `urls.py`.

---

## ✅ Final Deployment Checklist

| Task                             | Status |
| -------------------------------- | ------ |
| Code pushed to GitHub            | ✅      |
| `gunicorn` installed             | ✅      |
| Static files configured          | ✅      |
| `DEBUG=False` in production      | ✅      |
| `SECRET_KEY` in environment vars | ✅      |
| PostgreSQL set up (optional)     | ✅      |
| Migrations applied               | ✅      |
| API tested live                  | ✅      |

---

##  References

* [Render.com Docs](https://render.com/docs)
* [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)


## Testing

✅ Testing Summary
-----------------

A comprehensive suite of unit and integration tests was implemented across all major components of the **Productivity App**, covering models, permissions, serializers, views, and routing. All tests were executed using Django’s TestCase and Django REST Framework’s APITestCase, and **all tests passed successfully**.

### 📦 productivity\_app/models.py Tests

#### ✅ Task Model

*   Successfully tested task creation with both required and optional fields.
    
*   Confirmed default values (e.g., status = 'pending') are correctly set.
    
*   Verified that created\_at and updated\_at fields are automatically populated.
    
*   Confirmed \_\_str\_\_() method returns the task title.
    
*   Extensively tested is\_overdue property for tasks due today, in the past, future, and with no due date.
    
*   Many-to-many relationship with assigned\_users thoroughly validated:
    
    *   Single and multiple user assignments passed.
        
    *   Removing and deleting users correctly updates task relationships.
        

#### ✅ File Model

*   File creation and linkage to tasks tested successfully.
    
*   Verified automatic setting of uploaded\_at.
    
*   \_\_str\_\_() method returns expected file name.
    
*   Confirmed that deleting a task also deletes associated files via on\_delete=models.CASCADE.
    

#### ✅ Profile Model

*   Successfully created profiles linked to users.
    
*   Automatic timestamp fields validated.
    
*   \_\_str\_\_() returns the user’s string representation or "Profile" if user is missing.
    
*   Profiles correctly ordered by created\_at descending as per Meta option.
    

#### ✅ Signal: create\_profile

*   Confirmed profile is automatically created upon user creation.
    
*   Verified proper population of name and email in linked profile.
    

### 🔐 productivity\_app/permissions.py Tests

#### ✅ IsAssignedOrReadOnly

*   Confirmed read access (GET, HEAD, OPTIONS) is allowed for all users.
    
*   Write access tested for:
    
    *   Unauthenticated users (denied)
        
    *   Authenticated users (conditionally allowed based on assignment)
        
*   Verified object-level permission enforces assignment requirement.
    

#### ✅ IsSelfOrReadOnly

*   Read access permitted to all users.
    
*   Write access:
    
    *   Allowed for users updating their own objects.
        
    *   Denied for others.
        
    *   Denied for unauthenticated users.
        

#### ✅ IsOwnerOrReadOnly

*   Read operations open to all.
    
*   Write/delete permitted only to object owners.
    
*   Unauthenticated users blocked from making modifications.
    

### 🔧 productivity\_app/serializers.py Tests

#### ✅ FileSerializer

*   File objects serialized with correct fields (id, file path).
    

#### ✅ UserSerializer

*   Users serialized with id, username, and email.
    

#### ✅ TaskSerializer

*   Serialized task data includes all relevant fields and relations:
    
    *   assigned\_users as primary keys.
        
    *   upload\_files correctly nested.
        
    *   is\_overdue calculated and serialized.
        
*   Create/update tested with valid/invalid data and user assignments.
    

#### ✅ TaskListSerializer

*   Correct subset of task fields serialized as intended.
    

#### ✅ TaskDetailSerializer

*   Verified full serialization including nested assigned\_users and upload\_files.
    
*   Writeable assigned\_user\_ids used to update users successfully.
    

#### ✅ RegisterSerializer

*   Valid registrations created users and linked profiles.
    
*   Error handling verified for:
    
    *   Password mismatches
        
    *   Weak passwords
        
    *   Duplicate names or emails
        
    *   Missing fields
        
*   Password hashing verified.
    

#### ✅ LoginSerializer

*   Valid login returned expected JWT tokens.
    
*   Invalid and missing credentials handled with appropriate errors.
    
*   Inactive users prevented from logging in.
    

#### ✅ ProfileSerializer

*   Correct profile serialization tested.
    
*   to\_representation outputs expected id, name, and email.
    

### 🌐 productivity\_app/views.py Tests

#### ✅ ProfileViewSet

*   Profile list/retrieve tested for authenticated and unauthenticated users.
    
*   Own profile update/delete allowed.
    
*   Accessing others’ profiles for write/delete resulted in 403 Forbidden.
    
*   perform\_update and perform\_destroy logic correctly enforced.
    

#### ✅ TaskViewSet

*   Authenticated users saw only assigned tasks; unauthenticated users saw all (read-only).
    
*   Task creation with and without assigned users worked correctly.
    
*   Retrieve, update, and delete actions tested for permission enforcement.
    
*   File upload and retrieval tested via PATCH and nested serialization.
    

#### ✅ UsersListAPIView

*   Authenticated users can list all users.
    
*   Unauthenticated access rejected (401).
    

#### ✅ UserDetailAPIView

*   Authenticated users can retrieve/update/delete their own info.
    
*   Unauthenticated users blocked (401).
    

#### ✅ RegisterViewSet

*   Registration endpoint successfully created user and profile.
    
*   JWT tokens returned upon success.
    
*   Error handling tested for bad input and validated properly.
    
*   Ensured atomicity—no partial records persisted on failure.
    

#### ✅ LoginViewSet

*   Valid login returned access and refresh tokens.
    
*   Invalid/missing credentials or inactive users handled with correct status codes.
    

### 🧭 drf\_api/urls.py Tests

*   Root path (/) returns the expected JSON message.
    
*   Admin path (/admin/) accessible and functional.
    
*   Verified correct inclusion of all productivity\_app routes by accessing key endpoints.
    

### 🧪 Overall Testing Coverage

*   All test cases executed in isolated test databases using Django's testing tools.
    
*   Coverage spans models, views, permissions, serializers, URLs, and signal behaviors.
    
*   **All tests passed successfully**, confirming that the application is stable, secure, and ready for production.

### Manual testing

✅ **Manual Test Report – Productivity App**
===========================================

🗂️ productivity\_app/models.py Manual Tests
--------------------------------------------

### **Task Model**

*   **Model Creation:**✅ Created a Task instance in Django Admin and via shell with required and optional fields (title, description, due\_date, category).✅ Verified created\_at and updated\_at fields were auto-populated.✅ Confirmed no errors occurred.
    
*   **Field Defaults:**✅ Left status field blank during creation.✅ Verified it defaulted to 'pending' after saving.
    
*   **\_\_str\_\_ Method:**✅ Called str(task\_instance) in Django shell.✅ Confirmed it returned the task title.
    
*   **is\_overdue Property:**✅ Created tasks with:
    
    *   Today’s date ➜ is\_overdue = False
        
    *   Past date ➜ is\_overdue = True
        
    *   Future date ➜ is\_overdue = False
        
    *   No due\_date ➜ is\_overdue = False✅ All scenarios returned correct boolean.
        
*   **Many-to-Many (assigned\_users):**✅ Assigned single and multiple users via Admin and shell.✅ Verified association.✅ Removed a user from task ➜ user removed successfully.✅ Deleted a user ➜ user unlinked from tasks automatically.
    

### **File Model**

*   **Model Creation:**✅ Uploaded a file via Admin and linked it to a Task.✅ Verified file saved and uploaded\_at auto-populated.
    
*   **\_\_str\_\_ Method:**✅ Confirmed str(file\_instance) returned the file name.
    
*   **Cascade Delete:**✅ Deleted the linked Task ➜ associated files deleted too.
    

### **Profile Model**

*   **Model Creation:**✅ Manually created a Profile via shell and linked it to a User.✅ Confirmed created\_at, updated\_at set.
    
*   **\_\_str\_\_ Method:**✅ Returned User's name when linked. Returned 'Profile' when unlinked.
    
*   **Ordering (Meta):**✅ Created multiple profiles at different times.✅ Queried all ➜ confirmed descending order by created\_at.
    

### **Signals**

*   **create\_profile on user creation:**✅ Created a new User ➜ verified a Profile was auto-generated.✅ Checked that Profile fields (name, email) matched the User.
    

🔐 productivity\_app/permissions.py Manual Tests
------------------------------------------------

### **IsAssignedOrReadOnly**

*   **has\_permission:**✅ Used Postman for:
    
    *   GET (read) as unauthenticated ➜ allowed
        
    *   POST as unauthenticated ➜ 403 Forbidden
        
    *   POST as authenticated ➜ allowed
        
*   **has\_object\_permission:**✅ Confirmed:
    
    *   GET allowed for any user
        
    *   PUT by unassigned user ➜ denied
        
    *   PUT by assigned user ➜ allowed
        

### **IsSelfOrReadOnly**

*   **has\_object\_permission:**✅ Authenticated user updated own data ➜ allowed✅ Tried to update another user ➜ denied✅ Unauthenticated user ➜ denied
    

### **IsOwnerOrReadOnly**

*   **has\_object\_permission:**✅ Verified profile update/delete only allowed for the owner✅ All reads allowed✅ Unauthenticated users ➜ cannot modify
    

📦 productivity\_app/serializers.py Manual Tests
------------------------------------------------

### **FileSerializer**

*   ✅ Serialized a File instance ➜ verified output fields (id, file) in JSON.
    

### **UserSerializer**

*   ✅ Serialized a User ➜ confirmed id, username, email appeared.
    

### **TaskSerializer**

*   ✅ Serialized a Task ➜ verified all fields: id, title, description, due\_date, etc.
    
*   ✅ Verified nested upload\_files and assigned\_users fields.
    
*   ✅ Confirmed is\_overdue logic appeared correctly in output.
    
*   ✅ Created Task via serializer ➜ assigned\_users set correctly
    
*   ✅ Attempted invalid input ➜ appropriate validation errors shown
    

### **TaskListSerializer**

*   ✅ Serialized Task ➜ output only showed fields: id, title, due\_date, is\_overdue.
    

### **TaskDetailSerializer**

*   ✅ Verified full output including nested users/files
    
*   ✅ Used assigned\_user\_ids to update assigned users ➜ success
    

### **RegisterSerializer**

*   ✅ Registered new user with valid data ➜ success
    
*   ✅ Tried:
    
    *   Mismatched password ➜ error
        
    *   Weak password ➜ error
        
    *   Existing email ➜ error
        
    *   Missing fields ➜ validation errors
        
*   ✅ Confirmed create() created User + Profile
    
*   ✅ Password hashed correctly
    

### **LoginSerializer**

*   ✅ Valid email/password ➜ success
    
*   ✅ Missing fields ➜ error
    
*   ✅ Invalid credentials ➜ 401
    
*   ✅ Inactive user ➜ login blocked
    

### **ProfileSerializer**

*   ✅ Serialized a Profile ➜ output showed id, name, email from user
    
*   ✅ Confirmed to\_representation() returns expected output
    

🌐 productivity\_app/views.py Manual Tests
------------------------------------------

### **ProfileViewSet**

*   ✅ List: GET /api/profiles/ ➜ All visible (auth & unauth)
    
*   ✅ Retrieve: GET own or other’s profile ➜ success
    
*   ✅ Update:
    
    *   Own profile ➜ success
        
    *   Another profile ➜ 403 Forbidden
        
    *   Unauth ➜ 401
        
*   ✅ Delete:
    
    *   Own profile ➜ success
        
    *   Another ➜ 403
        
    *   Unauth ➜ 401
        

### **TaskViewSet**

*   ✅ List (auth): only assigned tasks visible
    
*   ✅ List (unauth): all visible
    
*   ✅ Create (auth): with/without assigned\_users ➜ both worked
    
*   ✅ Create (unauth): 401
    
*   ✅ Retrieve: any user could view
    
*   ✅ Update:
    
    *   Assigned ➜ success
        
    *   Not assigned ➜ 403
        
    *   Unauth ➜ 401
        
*   ✅ Delete:
    
    *   Assigned ➜ success
        
    *   Not assigned ➜ 403
        
    *   Unauth ➜ 401
        
*   ✅ Uploaded file to task via PATCH ➜ success
    
*   ✅ Verified task's upload\_files in GET response
    

### **UsersListAPIView**

*   ✅ Auth ➜ received user list
    
*   ✅ Unauth ➜ 401 Unauthorized
    

### **UserDetailAPIView**

*   ✅ Auth ➜ could retrieve/update/delete self
    
*   ✅ Unauth ➜ all actions blocked (401)
    

### **RegisterViewSet**

*   ✅ Valid registration ➜ created user + profile + JWT returned
    
*   ✅ Invalid scenarios ➜ appropriate errors
    
*   ✅ Checked for no partial data created on error
    

### **LoginViewSet**

*   ✅ Valid login ➜ received JWT tokens
    
*   ✅ Invalid credentials ➜ 401
    
*   ✅ Missing credentials ➜ 400
    
*   ✅ Inactive account ➜ blocked
    

🛣️ drf\_api/urls.py Manual Tests
---------------------------------

*   ✅ Accessed / ➜ got {"message": "Welcome to the Productivity App API"}
    
*   ✅ /admin/ opened login screen ➜ redirected or 200 OK
    
*   ✅ Visited /api/tasks/ ➜ verified routing works
    

✅ **Summary**
=============

AreaTests RunPassedFailedmodels.py20+✅ All❌ 0permissions.py15+✅ All❌ 0serializers.py30+✅ All❌ 0views.py40+✅ All❌ 0urls.py3✅ All❌ 0


✅ Python Validation & Bug Fix Report – Productivity App
=======================================================

🧪 1. Model Validation Tests (models.py)
----------------------------------------

### ✅ Task Model

*   **Validation Performed**:
    
    *   Created task with all fields
        
    *   Tested is\_overdue logic
        
    *   Left optional fields blank
        
    *   Verified \_\_str\_\_ representation
        
*   **🐞 Bug Found**:
    
    *   is\_overdue raised TypeError when due\_date was None
        
*   **🔧 Fix Applied**
    
*   :@property
    
    def is\_overdue(self):
    
    if self.due\_date is None:
    
    return False
    
    return self.due\_date < timezone.now().date()
    

### ✅ File Model

*   **Validation Performed**:
    
    *   File linked to Task
        
    *   Checked cascade deletion
        
    *   Validated string output
        
*   **🐞 Bug Found**:
    
    *   \_\_str\_\_ failed when file was missing
        
*   **🔧 Fix Applied**:
    

def \_\_str\_\_(self):

return self.file.name if self.file else "Unnamed file"

### ✅ Profile Model

*   **Validation Performed**:
    
    *   Created manually and via signal
        
    *   Checked ordering, string output
        
*   **🐞 Bug Found**:
    
    *   \_\_str\_\_ returned None when user was null
        
*   def \_\_str\_\_(self):
    
    return self.user.username if self.user else "Profile"
    

🔐 2. Permissions Validation (permissions.py)

### ✅ IsAssignedOrReadOnly, IsSelfOrReadOnly, IsOwnerOrReadOnly

*   **Validation Performed**:
    
    *   Used RequestFactory with AnonymousUser and User
        
    *   Simulated GET, PUT, DELETE requests
        
*   **🐞 Bug Found**:
    
    *   Accessing assigned\_users without null check
        
*   **🔧 Fix Applied**:
    

if hasattr(obj, 'assigned\_users') and request.user in obj.assigned\_users.all():

🧾 3. Serializer Validation (serializers.py)

### ✅ RegisterSerializer

*   **Validation Performed**:
    
    *   Weak password
        
    *   Email already exists
        
    *   Password mismatch
        
*   **🐞 Bug Found**:
    
    *   Password confirmation not checked
        
*   **🔧 Fix Applied**:
    

def validate(self, data):

if data\['password'\] != data\['password2'\]:

raise serializers.ValidationError("Passwords do not match")

✅ LoginSerializer

*   **Validation Performed**:
    
    *   Valid and invalid credentials
        
    *   Missing fields
        
*   **🐞 Bug Found**:
    
    *   Error when email field missing
        
*   **🔧 Fix Applied**:
    

email = data.get('email', None)

password = data.get('password', None)

if not email or not password:

raise serializers.ValidationError("Email and password required")

✅ TaskDetailSerializer

*   **Validation Performed**:
    
    *   Nested fields rendering
        
    *   Task update with assigned\_user\_ids
        
*   **🐞 Bug Found**:
    
    *   Updating assigned\_user\_ids didn’t save users
        
*   **🔧 Fix Applied**:
    

def update(self, instance, validated\_data):

assigned\_user\_ids = validated\_data.pop('assigned\_user\_ids', None)

...

if assigned\_user\_ids is not None:

instance.assigned\_users.set(assigned\_user\_ids)

🌍 4. Views Validation (views.py)

### ✅ TaskViewSet, ProfileViewSet, RegisterViewSet, LoginViewSet

*   **Validation Performed**:
    
    *   Used APIRequestFactory and force\_authenticate
        
    *   Tested List, Retrieve, Update, Delete, Auth flows
        
*   **🐞 Bug Found**:
    
    *   get\_queryset() failed for anonymous users
        
*   **🔧 Fix Applied**:
    

if self.request.user.is\_authenticated:

return Task.objects.filter(assigned\_users=self.request.user)

return Task.objects.all()

*   **🐞 Bug Found**:
    

*   Profile not created with serializer save
    
*   **🔧 Fix Applied**:
    
    *   Added @receiver(post\_save, sender=User) in signals.py
        

### ✅ LoginViewSet

*   **🐞 Bug Found**:
    
    *   Did not check if user is active
        
*   **🔧 Fix Applied**:
    

if user and user.is\_active:

return user

raise AuthenticationFailed("User is inactive or credentials are invalid")

🌐 5. URL Validation (urls.py)

*   **Validation Performed**:
    
    *   Used reverse(), APIClient.get()/post()
        
    *   Verified endpoint routes for:
        
        *   /api/tasks/
            
        *   /api/register/
            
        *   /api/login/
            
        *   /api/profiles/
            
        *   /api/users/
            

✅ Validation SummaryComponentBugs FoundBugs FixedValidation MethodModels3✅ 3Unit Tests + ShellPermissions1✅ 1RequestFactorySerializers4✅ 4DRF SerializerTestsViews3✅ 3APIClient + RequestFactoryURLs0✅ N/AURL Reverse + APIClient🎉 Final Result

**All Python validation tests passed successfully. All known bugs were fixed.**

# 📘 Final Frontend Project Scope Reflection

## 🧠 Project Background

At the start of this project, I set out with a broad and ambitious plan based on a rich set of user stories. My goal was to build a productivity app with not only essential task management features, but also extra views such as:

- A **user profile** section  
- A **settings** page  
- A **calendar view** for tasks and habits  

These were inspired by real-world productivity tools and aimed at providing a professional and complete user experience.

---

## 🎯 What Changed

As the project progressed, I faced time and resource limitations, especially while integrating backend APIs with the frontend and ensuring authentication, CRUD operations, and UX were fully functional and polished.

After much consideration, I made the decision to **narrow the project scope** to focus on **core features** only — the parts of the app that deliver the most value and are essential to meet the assessment requirements.

---

## ✅ Final Features Implemented

Here’s what the final version of the frontend includes:

- ✅ Fully working **authentication system** (Login/Register using JWT)
- ✅ Task management with:
  - Create, read, update, delete (CRUD)
  - File uploads
  - Due dates, priority, state
  - Filtering and sorting
- ✅ Clean, responsive UI with Bootstrap
- ✅ User feedback with spinners and alerts
- ✅ API integration with a deployed Django backend

---

## ❌ Features Postponed for Later

The following views/features were initially planned but **have been postponed** to a potential future upgrade:

- 🚫 **User Profile View**
- 🚫 **Settings Page**
- 🚫 **Calendar-Based Task View**

These features required more time for integration and design, and I decided not to compromise the quality of the existing features just to add more scope.

---

## 💬 Reflection

While it was tough to let go of some planned views, I learned a valuable lesson about **prioritizing core functionality**, **maintainability**, and **realistic deadlines**. These extra features can definitely be revisited later — perhaps in version 2.0 of this project.

The decision to reduce scope was not about giving up — it was about focusing on delivering a stable, complete, and well-tested MVP.

---

## 🚀 What's Next?

I’m excited to explore the remaining features in the future:

- Integrating a **calendar view** using something like `react-calendar` or `fullcalendar`
- Allowing users to view and edit their **profile**
- Adding a **settings panel** for personalization

---

Thanks to this experience, I’ve grown more confident in making practical product decisions and shipping working software — even when it means leaving some things for later.


Credits
================================

# Acknowledging Support and Opportunity

I want to extend my sincere appreciation to the **Code Institute student care team** for their incredible tolerance and support. My project submission ended up being overdue by approximately a month, and their understanding during this challenging period was invaluable.

Finally, I am profoundly grateful to the **entire Code Institute staff** for providing me with the opportunity to pursue my dream of becoming a **full-stack software developer**. The education and experience have been transformative.




### Acknowledgments

- Thank you very much Code Institute Student Care Team Tutor and Mentor for your dedication and commitment in supporting me to achieve in submitting this Advanced Front-End Full Stack Software Development project and broadening my career opportunities.
