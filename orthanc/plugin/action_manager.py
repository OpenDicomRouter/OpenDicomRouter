import requests

def executeAction(dicom_file,dicom_data):
    sendMail(dicom_data)
    sendFile(dicom_file)

def sendMail(dicom_data):
    requests.post('http://160.85.252.135:2020/mail', json={"recipient": "tomt@zhaw.ch","subject": "Mailserver Test","body": dicom_data.PatientID})

def sendFile(dicom_file):
    requests.post('http://160.85.252.135:2020/ftp', dicom_file)