from distutils.log import info
import time
import requests
#import orthanc
import io
import json
import pprint
import threading
from Policy import Policy
from condition import Condition
import glob
from redis_db import RedisDB
import dicom_reader
import pydicom
from policy_manager import PolicyManager

TIMER1= None
POLICY_MANAGER = PolicyManager()
redis = RedisDB()

time.sleep(2)
print("Policy Manager", POLICY_MANAGER )

policies = {}
rules = []

def OnStoredInstance(dicom, instanceId):
    print('Received instance %s of size %d (transfer syntax %s, SOP class UID %s)' % (
        instanceId, dicom.GetInstanceSize(),
        dicom.GetInstanceMetadata('TransferSyntax'),
        dicom.GetInstanceMetadata('SopClassUid')))

    series_instance_uid = dicom.GetInstanceMetadata('SeriesInstanceUid')
    study_instance_uid = dicom.GetInstanceMetadata('StudyInstanceUid')

    # Print the origin information
    if dicom.GetInstanceOrigin() == orthanc.InstanceOrigin.DICOM_PROTOCOL:
        print('This instance was received through the DICOM protocol')
    elif dicom.GetInstanceOrigin() == orthanc.InstanceOrigin.REST_API:
        print('This instance was received through the REST API')


    f = orthanc.GetDicomForInstance(instanceId)
    dicom = pydicom.dcmread(io.BytesIO(f))
    POLICY_MANAGER.evaulate_policies(dicom,series_instance_uid,study_instance_uid,instanceId)
    
def task_every_minute():
    global TIMER1
    TIMER1 = None
    # Do stuff for the task that runs every minute
    #orthanc.LogWarning("Task running every minute")
    POLICY_MANAGER.update_policies()
    TIMER1 = threading.Timer(60, task_every_minute)  # Re-schedule after 60 seconds (1 minute)
    TIMER1.start()

def OnChange(changeType, level, resource):
    if changeType == orthanc.ChangeType.ORTHANC_STARTED:
        #orthanc.LogWarning("Starting the scheduler")
        task_every_minute()

    elif changeType == orthanc.ChangeType.ORTHANC_STOPPED:
        if TIMER1 != None:
            orthanc.LogWarning("Stopping the minute scheduler")
            TIMER1.cancel()


#orthanc.RegisterOnStoredInstanceCallback(OnStoredInstance)
#orthanc.RegisterOnChangeCallback(OnChange)
"""task_every_10_seconds()
task_every_minute()
task_every_hour()"""
if __name__ == "__main__":  
    print("HELLO :\n")
    
    POLICY_MANAGER.print_info()

    data_patj = "test_files/"
    files = dicom_reader.get_file_paths(data_patj)
    file = files[0]
    
    dicom_data = dicom_reader.get_dicom_data(file)
    series_instance_uid = "2"
    study_instance_uid = "3"
    instanceId = "1"
    POLICY_MANAGER.evaulate_policies(file,dicom_data,series_instance_uid,study_instance_uid,instanceId)
    
    
    # Print the DICOM tags
    
    #evaluation = policies[0].evaluate(dicom_data)
    