import paramiko
from socket import gethostbyname

def connect2server(servername, username, password, hostkey,port):
    """
    connect2server

    This function is used to connect to a remote server using the paramiko library.

    :param servername: String, the hostname or IP address of the server.
    :param username: String, the username to use for authentication.
    :param password: String, the password to use for authentication.
    :param hostkey: String, the host key to use for authentication.
    :param port: Integer, the port number to use for the connection.

    :return: paramiko.Transport object, the transport object representing the connection to the remote server.
    """
    gethostbyname(servername)
    try:
        transport = paramiko.Transport(servername, port)
        transport.connect(username=username,password=password, hostkey=hostkey)
    except paramiko.ssh_exception.AuthenticationException as e:
        print(e)
        exit()
    return transport

