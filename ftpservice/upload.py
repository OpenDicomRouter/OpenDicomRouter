
import paramiko
from flask import Flask, Response, request
from flask import Flask, jsonify, request, json 
import os
import uuid
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
from connection import connect2server
from flask import Flask, request
from ftplib import FTP
from werkzeug.datastructures import FileStorage

app = Flask(__name__)
@app.route('/test', methods=["GET"])
def getTest():
    result = {
        "id":1,
        "value":10
    }
    return jsonify({'result' : result})

@app.route("/ftp", methods=['POST'])
def sftp_upload():
    #default port
    port = 21
    json_data = request.files.get('json')
    if json_data:
        # Parse the JSON string into a Python dictionary
        json_data = json.loads(json_data.read())
    else:
        return jsonify({'error': 'No json data provided'}), 400
    
    # Retrieve the Dicom file from the request
    dicom_file = request.files.get('dicom')
    if dicom_file:
        # Save the Dicom file locally
        dicom_file.save('path_to_save_your_file.dcm')
    else:
        return jsonify({'error': 'No dicom file provided'}), 400

    config = json_data
    
    if not config:
        return jsonify({'error': 'No form data provided'}), 400
    print(" \n\n\nconfig \n\n\n\n", config)
    transport  = connect2server(servername=config["servername"],username=config["username"],password=config["password"],hostkey=None,port=port)
    sftp = paramiko.SFTPClient.from_transport(transport)
    
    try:
        file = request.files.getlist('file')
        file.save(file.filename)
        with sftp.open(file.filename, 'w+', 32768) as f:
            file.save(f)
        sftp.close()
        transport.close()
        os.remove(file.filename)
    except Exception as e:
        return jsonify({'error': 'FTP upload failed'}), 400
    print("upload done !")
    # If everything goes well, return a success response
    return jsonify({'message': 'Request handled successfully'}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3030,debug=True)
