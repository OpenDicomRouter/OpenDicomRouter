import requests
import traceback
API_URL = 'http://api:5000'
API_URL = 'http://160.85.252.250:5000'
MAIL_SERVICE_URL = 'http://172.22.0.6:2020'
FTP_SERVICE_URL = 'http://172.0.0.1:3030'


def get_policies():
    """
    Fetch the list of policies from the API.

    Returns:
        List of policies.
    """
    url = API_URL + '/policies'
    response = requests.get(url)
    policies = response.json()['result']
    return policies

def get_single_policy(policy_id):
    """
    Fetch a single policy using its policy ID.

    Args:
        policy_id: The ID of the policy.

    Returns:
        The policy as a dictionary.
    """
    url = API_URL + '/policies' + policy_id
    response = requests.get(url)
    print("respones, ", response)
    policy = response.json()['result']
    return policy

def get_rules(policy_id):
    """
    Fetch the rules associated with a policy.

    Args:
        policy_id: The ID of the policy.

    Returns:
        List of rules.
    """
    url = API_URL + '/rules/' + policy_id
    response = requests.get(url)
    rules = response.json()['result']
    return rules

def get_conditions(policy_id):
    """
    Fetch the conditions associated with a policy.

    Args:
        policy_id: The ID of the policy.

    Returns:
        List of conditions.
    """
    url = API_URL + '/condition/' + policy_id
    response = requests.get(url)
    conditions = response.json()['result']
    return conditions

def get_actions(policy_id):
    url = API_URL + '/actions/'+str(policy_id)
    response = requests.get(url)
    response_dict = response.json()
    return response_dict["result"]

def get_action_object(action_object_id):
    url = API_URL + '/action_objects/'+str(action_object_id)
    response = requests.get(url)
    response_dict = response.json()
    return response_dict

def get_all_actions():
    """
    Fetch all available actions.

    Returns:
        List of all actions.
    """
    url = API_URL + '/actionObjects'
    response = requests.get(url)
    response_dict = response.json()
    return response_dict['result']


def add_study(study_id):
    """
    Add a new Study ID to the backend database.

    Args:
        study_id: The Study ID to add.

    Returns:
        A JSON object with the response from the server.
    """
    url = f"{API_URL}/orthanc_studies/{study_id}"
    response = requests.post(url)
    return response.json()


def get_all_studies():
    """
    Retrieve all studies from the backend database.

    Returns:
        A JSON object containing a list of all studies.
    """
    url = f"{API_URL}/orthanc_studies"
    response = requests.get(url)
    return response.json()


def get_study(study_id):
    """
    Retrieve a specific study from the backend database using its Study ID.

    Args:
        study_id: The Study ID to retrieve.

    Returns:
        A JSON object with the study data.
    """
    url = f"{API_URL}/orthanc_studies/{study_id}"
    response = requests.get(url)
    return response.json()


def delete_study(study_id):
    """
    Delete a specific study from the backend database using its Study ID.

    Args:
        study_id: The Study ID to delete.

    Returns:
        A JSON object with the response from the server.
    """
    url = f"{API_URL}/orthanc_studies/{study_id}"
    response = requests.delete(url)
    return response.json()

def delete_all_studies():
    """
    Delete all studies from the backend database.

    Returns:
        A JSON object with the response from the server.
    """
    url = f"{API_URL}/orthanc_studies"
    response = requests.delete(url)
    return response.json()


def add_series(series_id):
    """
    Add a new Series ID to the backend database.

    Args:
        series_id: The Series ID to add.

    Returns:
        A JSON object with the response from the server.
    """
    url = f"{API_URL}/orthanc_series/{series_id}"
    response = requests.post(url)
    return response.json()


def get_all_series():
    """
    Retrieve all series from the backend database.

    Returns:
        A JSON object containing a list of all series.
    """
    url = f"{API_URL}/orthanc_series"
    response = requests.get(url)
    print("response : ", response)
    return response.json()


def get_series(series_id):
    """
    Retrieve a specific series from the backend database using its Series ID.

    Args:
        series_id: The Series ID to retrieve.

    Returns:
        A JSON object with the series data.
    """
    url = f"{API_URL}/orthanc_series/{series_id}"
    response = requests.get(url)
    return response.json()


def delete_series(series_id):
    """
    Delete a specific series from the backend database using its Series ID.

    Args:
        series_id: The Series ID to delete.

    Returns:
        A JSON object with the response from the server.
    """
    url = f"{API_URL}/orthanc_series/{series_id}"
    response = requests.delete(url)
    return response.json()

def delete_all_series():
    """
    Delete all series from the backend database.

    Returns:
        A JSON object with the response from the server.
    """
    url = f"{API_URL}/orthanc_series"
    response = requests.delete(url)
    return response.json()



def send_mail(mail_data):
    try: 
        url = f"{MAIL_SERVICE_URL}/mail_w_conf"
        print(mail_data)
        response = requests.post(url,json=mail_data)
        return response
    except:
        print("error in sending mail")
        traceback.print_exc()
        return {"Error": "error occured while sending mail"}

def send_ftp(files):
    url = f"{FTP_SERVICE_URL}/ftp"

    response = requests.post(url, files=files)
    url = f"{FTP_SERVICE_URL}/test"
    response = requests.get(url)
    print("respones : ",response)

if __name__ == "__main__":
    actions = get_all_actions()
    for action in actions:
        print(action)