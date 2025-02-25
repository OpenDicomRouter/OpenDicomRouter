import json
import smtplib

def connect2server(user, password, host, port):
    """
    Connect to an SMTP server and return a connection object.

    Args:
        user (str): The username to use when connecting to the server.
        password (str): The password to use when connecting to the server.
        host (str): The hostname or IP address of the server.
        port (int): The port number to use when connecting to the server.

    Returns:
        A connection object representing the connection to the server.
    """
    try:
        server = smtplib.SMTP(host=host,port=port,timeout=5)
        server.starttls()
        server.login(user=user, password=password)
    except:
        server = None
    return server

# GET CREDENTIALS - from json file
with open("credentials.json", mode="r") as f:
    credentials = json.load(f)