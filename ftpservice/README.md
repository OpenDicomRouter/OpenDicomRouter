# Microservice: FTP Upload 

The microservice is a Flask application that handles file uploads to a remote server via SFTP. It uses the `paramiko` library for SFTP communication and `flask_bcrypt`, `flask_cors`, and `flask_jwt_extended` for security and handling of HTTP requests.

## Route: /ftp

The endpoint `/ftp` accepts HTTP `POST` requests containing files to be uploaded. The files are retrieved from the request using `request.files.getlist('file')`. A connection to the remote server is established using the function `connect2server()` from the `connection` module, and the files are uploaded using the `paramiko.SFTPClient.from_transport()` method. The credentials for the remote server are read from a `credentials.json` file.

## Credentials

The credentials for the remote server, including the server name, username, password, and file storage path, are stored in the `credentials.json` file. It is important to replace the placeholder values in this file with the correct credentials before using the microservice.

```
{
    "servername": "your_server_name",
    "username": "your_username",
    "password": "your_password",
    "fileStorage": "/path/to/file/storage/"
}
```

**Warning:** It is highly recommended to use encrypted storage for the credentials and to not hardcode them in the script.


The code for the SFTP upload service can be found in the upload.py file. This service runs in a Docker container and is designed to handle file uploads via SFTP. The connection to the server is handled in the connection.py file, which is imported into the upload.py file. The service is built using the Flask library, and uses a number of other libraries such as flask_bcrypt, flask_cors, and flask_jwt_extended to provide secure and optimized file upload functionality. The service can be started by running the upload.py file and it will listen on host "0.0.0.0" and port 3030.