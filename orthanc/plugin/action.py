import requests
import api_bridge
import os
import traceback
import dicom_reader
import json

def executeAction(dicom_file,dicom_data):
    sendMail(dicom_data)
    sendFile(dicom_file)

def sendMail(dicom_data):
    mailAction= api_bridge.get_actions("mail")[0]
    url = mailAction['url']
    recipient = mailAction['recipient']
    subject = mailAction['subject']
    body = mailAction['body']
    subjectform = dicom_data.PatientID+": "+subject
    requests.post(url, json={"recipient": recipient,"subject": subjectform,"body": body})

def sendFile(dicom_file):
    ftpAction= api_bridge.get_actions("ftp")[0]
    url = ftpAction['url']
    files = {'file': open(dicom_file, 'dcm')}
    requests.post(url, files=files)



from abc import ABC, abstractmethod

class Action(ABC):
    def __init__(self, action_type):
        self.action_type = action_type

    @abstractmethod
    def to_dict(self):
        pass

    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def printInfo(self):
        pass

    def getActionObject(self,actionObjectID):
        action_object = api_bridge.get_action_object(actionObjectID)
        return action_object

class SaveLocallyAction(Action):
    def __init__(self):
        super().__init__("Save Locally")

    def to_dict(self):
        return {'type': self.action_type}

class MailAlertAction(Action):
    def __init__(self, raw_action):
        super().__init__("Mail Alert")
        
        self.id = raw_action['_id']
        self.action_object_id = raw_action['actionObjectID']
        self.to = raw_action['data']['to']
        self.subject= raw_action['data']['subject']
        self.message = raw_action['data']['message']
        raw_action_object = self.getActionObject(self.action_object_id)
        self.smtp_config = raw_action_object['config']


    def to_dict(self):
        return {
            'type': self.action_type,
            'mail': {
                'to': self.to,
                'subject': self.subject,
                'message': self.message,
                'link': "",
                "instance_id": ""
            },
            "smtp_config":self.smtp_config
        }

    def execute(self,dicom_file,dicom_data,series_instance_uid,study_instance_uid,instance_uid):
        data = self.to_dict()
        try:
            instance_url =  f"http://{os.environ['ORTHANC_URL']}:{os.environ['ORTHANC_PORT']}/instances/{instance_uid}"
            data['link'] = instance_url
            data['instance_id'] = instance_uid
        except:
            traceback.print_exc()
        print("\n\n\nvsending mail ...... \n\n\n",data)
        api_bridge.send_mail(data)


    def printInfo(self):
        print("-----------------------------------------")
        print("id", self.id)
        print("action_object_id", self.action_object_id)
        print("to", self.to)
        print("subject", self.subject)
        print("message", self.message)
        print("smtp_config", self.smtp_config)
        print("---------------------------------------")
    
class ForwardToModuleAction(Action):
    def __init__(self,raw_action):
        super().__init__("Forward to Module")
        self.id = raw_action['_id']
        self.action_object_id = raw_action['actionObjectID']
        raw_action_object = self.getActionObject(self.action_object_id)
        self.post_url = raw_action_object['config']['servername']
        

    def to_dict(self):
        return {
            'type': self.action_type,
            'post_url': self.post_url
        }
    
    def execute(self,dicom_file,dicom_data,series_instance_uid,study_instance_uid,instance_uid):
        print("execute ForwardToModuleAction")
        pass

    def printInfo(self):
        print("-----------------------------------------")
        print("id", self.id)
        print("action_object_id", self.action_object_id)
        print("post_url", self.post_url)
        print("---------------------------------------")
    
class DropAction(Action):
    def __init__(self):
        super().__init__("Drop")

    def to_dict(self):
        return {'type': self.action_type}

    def execute(self,dicom_file,dicom_data,series_instance_uid,study_instance_uid,instance_uid):
        pass

    def printInfo(self):
        return super().printInfo()

class FTPAction(Action):
    def __init__(self, raw_action):
        super().__init__("FTP")
        self.id = raw_action['_id']
        self.action_object_id = raw_action['actionObjectID']
        print(raw_action)

        raw_action_object = self.getActionObject(self.action_object_id)
        print("raw acton ob ", raw_action_object)
        """        
            self.ftp_config = { 
            'password': raw_action_object['password'], 
            'path': raw_action_object['path'], 
            'servername': raw_action_object['servername'], 
            'username': raw_action_object['username']
        }"""
        self.ftp_config = raw_action_object['config']


    def to_dict(self):
        return {
            'type': self.action_type,
            "ftp_config":self.ftp_config
        }

    def execute(self,dicom_file,dicom_data,series_instance_uid,study_instance_uid,instance_uid):
        print("execute FTP")
        print(self.ftp_config)
        print("file name" , dicom_file)
        files = {'file': open(dicom_file, 'rb')}
        files = {
        'json': ('json_data.json', json.dumps(self.ftp_config), 'application/json'),
        'dicom': (dicom_file, open(dicom_file, 'rb'), 'application/dicom')
        }
        api_bridge.send_ftp(files)


    def printInfo(self):
        print("-----------------------------------------")
        print("id", self.id)
        print("action_object_id", self.action_object_id)
        print("smtp_config", self.ftp_config)
        print("--------")


class ActionFactory:
    @staticmethod
    def create_action(action_type, raw_action):
        if action_type == "Save":
            return SaveLocallyAction()
        elif action_type == "Mail":
            return MailAlertAction(raw_action)
        elif action_type == "HTTP":
            return ForwardToModuleAction(raw_action)
        elif action_type == "FTP":
            return FTPAction(raw_action)
        elif action_type == "Drop":
            return DropAction()
        else:
            raise ValueError(f"Invalid action_type: {action_type}")
