# Flask Microservice for Sending Emails
## Configurateion
The following JSON configuration can be found in the credentials.json is a configuration file that contains the credentials needed to connect to an SMTP (Simple Mail Transfer Protocol) server. It holds the information needed to log into an email account and send emails.

```
{
    "smtp_host": "smtp.gmail.com",
    "smtp_port": 587,
    "user": "********@gmail.com",
    "password": "***Mcc1*****"
}
```

The file contains 4 key-value pairs:

smtp_host: The hostname or IP address of the SMTP server
smtp_port: The port number used to connect to the SMTP server
user: The email address used to log into the email account
password: The password for the email account
It is important to note that the credentials in this file must be changed with valid and secure information before using the system. Using the example credentials provided could result in unauthorized access to someone's email account.


## Functionality
This microservice is a REST API built using Flask that allows you to send emails using a simple POST request. It is designed to be simple and easy to use, and it relies on the `smtplib` library to handle the underlying email sending functionality.

The microservice has a single endpoint at `/mail` that you can send a POST request to with the following JSON data:

```
{
    "recipient": "example@example.com",
    "subject": "Email Subject",
    "body": "Email Body Text"
}
```

The microservice reads the email credentials from a `credentials.json` file, which should be placed in the same directory as the microservice code. The credentials file should contain the following information:

```
{
    "user": "email@example.com",
    "password": "email_password",
    "smtp_host": "smtp.example.com",
    "smtp_port": 587
}
```

When a POST request is made to the `/mail` endpoint, the microservice will use the `connect2server` function to connect to the email server using the credentials in the `credentials.json` file. It will then use the `send_message` function to send the email, passing in the email server connection, the email recipient, the subject, and the body.

Finally, the microservice will close the connection to the email server and return a `message Sent` response.