# Flask API for Webapp

This Flask API is a RESTful service for a web application. The API uses several Flask packages, including Flask, Flask-MongoEngine, Flask-PyMongo, Flask-Bcrypt, Flask-CORS, Flask-JWT-Extended, and Bson. It is designed to interact with multiple MongoDB databases using PyMongo.

## Dependencies:
- `flask==2.1.0`: Flask is a popular, lightweight Python web framework. This specific version (2.1.0) is being specified in the dependencies.
- `gunicorn==20.0.4`: Gunicorn is a production-ready HTTP server for Python web applications. It can be used to serve a Flask application. This specific version (20.0.4) is being specified in the dependencies.
- `flask-mongoengine`: Flask-MongoEngine is a Flask extension that provides integration with MongoEngine, an Object-Document Mapper (ODM) for working with MongoDB from Python.
- `flask-jwt-extended`: Flask-JWT-Extended is a Flask extension that makes it easy to add JSON Web Token (JWT) authentication to a Flask application.
- `flask-cors`: Flask-CORS is a Flask extension for handling Cross Origin Resource Sharing (CORS), which makes it possible to access resources from a different domain in a web application.
- `pymongo==3.12.0`: PyMongo is a Python library for working with MongoDB. This specific version (3.12.0) is being specified in the dependencies.
- `flask-pymongo`: Flask-PyMongo is a Flask extension that provides integration with PyMongo, making it easy to work with MongoDB databases in a Flask application.
- `flask-mongoengine`: This is a duplicate of the first `flask-mongoengine` dependency.
- `flask-bcrypt`: Flask-Bcrypt is a Flask extension that provides bcrypt hashing utilities for securely storing passwords.
- `mudicom`: This dependency is not a well-known library. More information is needed to determine what it does.
- `pillow`: Pillow is a fork of the Python Imaging Library (PIL). It adds image processing capabilities to your Python interpreter.
- `setuptools`: Setuptools is a collection of enhancements to the Python distutils (distribution utilities) that allow developers to more easily build and distribute Python packages, especially ones that have dependencies.

## Features
- User registration and login 
- CRUD operations for policies
- CRUD operations for conditions
- CRUD operations for rules
- CRUD operations for rule groups
- CRUD operations for groups
- CRUD operations for images
- CRUD operations for action objects

## Endpoints
The API has several endpoints for accessing and manipulating data. 

### Test Endpoint
The endpoint `/test` returns a test JSON object.

### User Endpoints
The API has endpoints for registering and logging in users. 
- The endpoint `/users/register` creates a new user in the UserDB database.
- The endpoint `/users/login` logs in an existing user. 

### Policy Endpoints
The API has endpoints for CRUD operations on policies. 
- The endpoint `/policies` creates a new policy in the PolicyDB database.
- The endpoint `/policies` retrieves all policies from the PolicyDB database.
- The endpoint `/policies/<id>` retrieves a specific policy from the PolicyDB database using its ObjectId.
- The endpoint `/policies/<id>` deletes a specific policy from the PolicyDB database using its ObjectId.
- The endpoint `/policies/<id>` updates a specific policy in the PolicyDB database using its ObjectId.

### Condition Endpoints
The API has endpoints for CRUD operations on conditions. 
- The endpoint `/condition` creates a new condition in the ConditionDB database.
- The endpoint `/condition/<policy_id>` retrieves all conditions associated with a specific policy from the ConditionDB database.
- The endpoint `/condition/<id>` retrieves a specific condition from the ConditionDB database using its ObjectId.
- The endpoint `/condition/<id>` deletes a specific condition from the ConditionDB database using its ObjectId.
- The endpoint `/condition/<id>` updates a specific condition in the ConditionDB database using its ObjectId.

### Rule Endpoints
The API has endpoints for CRUD operations on rules. 
- The endpoint `/rule` creates a new rule in the RulesDB database.
- The endpoint `/rule/<policy_id>` retrieves all rules associated with a specific policy from the RulesDB database.
- The endpoint `/rule/<id>` retrieves a specific rule from the RulesDB database using its ObjectId.
- The endpoint `/rule/<id>` deletes a specific rule from the RulesDB database using its ObjectId.
- The endpoint `/rule/<id>` updates a specific rule in the RulesDB database using its ObjectId.

## User Management 

The API supports basic user management functionalities such as user registration and user login. 

- **User Registration**: The API provides an endpoint `/users/register` for users to register. The registration endpoint accepts a JSON payload with the following fields: 
  - `first_name`: the first name of the user
  - `last_name`: the last name of the user
  - `email`: the email of the user
  - `password`: the password of the user

- **User Login**: The API provides an endpoint `/users/login` for users to log in. The login endpoint accepts a JSON payload with the following fields: 
  - `email`: the email of the user
  - `password`: the password of the user

## Policy Management 

The API provides functionalities for policy management. A policy can be added, updated, retrieved and deleted. 

- **Adding a Policy**: The API provides an endpoint `/policies` for adding a new policy. The endpoint accepts a JSON payload with the following fields: 
  - `user_id`: the id of the user who created the policy
  - `user_name`: the name of the user who created the policy
  - `policy_name`: the name of the policy
  - `policy_description`: the description of the policy

- **Retrieving a Policy**: The API provides an endpoint `/policies/<id>` for retrieving a specific policy by its id. 

- **Retrieving all Policies**: The API provides an endpoint `/policies` for retrieving all policies.

- **Updating a Policy**: The API provides an endpoint `/policies/<id>` for updating a specific policy by its id. The update endpoint accepts a JSON payload with the following fields: 
  - `policy_name`: the name of the policy
  - `policy_description`: the description of the policy

- **Deleting a Policy**: The API provides an endpoint `/policies/<id>` for deleting a specific policy by its id. 

## Condition Management 

The API provides functionalities for condition management. A condition can be added, updated, retrieved and deleted. 

- **Adding a Condition**: The API provides an endpoint `/condition` for adding a new condition. The endpoint accepts a JSON payload with the following fields: 
  - `policy_id`: the id of the policy to which the condition belongs
  - `property_key`: the property key of the condition
  - `property_operator`: the property operator of the condition
  - `property_value`: the property value of the condition
  - `description`: the description of the condition

- **Retrieving a Condition**: The API provides an endpoint `/condition/<policy_id>` for retrieving all conditions for a specific policy.

- **Updating a Condition**: The API provides an endpoint `/condition/<id>` for updating a specific condition by its id. The update endpoint accepts a JSON payload with the following fields: 
  - `property_key`: the property key of the condition
  - `property_operator`: the property operator of the condition
  - `property_value`: the property value of the condition
  - `description`: the description of the condition


