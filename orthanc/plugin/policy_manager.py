# A class that manages the policies fetched from Backend
from Policy import Policy
from api_bridge import get_policies, get_rules,get_conditions,add_series,add_study
import requests
import action
import dicom_reader
from redis_db import RedisDB
redis = RedisDB()

class PolicyManager():
    """
    The PolicyManager class is responsible for managing a list of policies,
    creating policy objects, updating policies, evaluating policies, and
    printing policy information.
    """
    policies = []
    existing_study_ids = set()
    existing_series_ids = set()

    def __init__(self):
        """
        Initializes the PolicyManager by fetching raw policies and creating
        policy objects.
        """
        self.policies = []
        raw_policies = get_policies()
        self.policies = self.create_policy_objects(raw_policies)

    def create_policy_objects(self, raw_policies):
        """
        Creates policy objects from the raw policy data.
        :param raw_policies: A list of raw policy data
        :return: A list of Policy objects
        """
        policies = []
        for raw_policy in raw_policies:
            policy = Policy(raw_policy)
            policies.append(policy)
        policies = list(filter(lambda policy: len(list(policy.conditions.keys())) > 0, policies))
        policies = list(filter(lambda policy: len(policy.actions) > 0, policies))
        policies = list(filter(lambda policy: policy.policy_active ==True,policies))
        return policies

    def update_policies(self):
        """
        Updates the policy list by fetching raw policies and creating
        policy objects.
        """
        raw_policies = get_policies()
        self.policies = self.create_policy_objects(raw_policies)

    def evaulate_policies(self,dicom_file,dicom_data,series_instance_uid=None,study_instance_uid=None,instance_uid=None):
        """
        Evaluates each policy in the list against the given DICOM data.
        If a policy evaluates to True, the associated action is executed.
        :param dicom_file: The DICOM file to process
        :param dicom_data: The DICOM data to evaluate
        """
        for policy in self.policies:
            if self.check_validation_conditions(policy, series_instance_uid,study_instance_uid,instance_uid):
                evaluation = policy.evaluate(dicom_data)
                if evaluation == True:
                    policy.run_actions(dicom_file,dicom_data,series_instance_uid,study_instance_uid,instance_uid )

        self.add_ids(study_instance_uid,series_instance_uid)
        if series_instance_uid:
            redis.set_exp("series_instance_uid:"+series_instance_uid ,series_instance_uid,3600)
        if study_instance_uid:
            redis.set_exp("study_instance_uid:"+study_instance_uid ,study_instance_uid,3600)
        



    def check_validation_conditions(self,policy, series_instance_uid,study_instance_uid,instance_uid ):
        do_evaluation = False
        actionExecutionType = policy.policy_actionExecutionType
        if (actionExecutionType == "onSeries" ) and not redis.get("series_instance_uid:"+series_instance_uid):
            do_evaluation = True
        elif (actionExecutionType == "onStudies" ) and not redis.get("study_instance_uid:"+study_instance_uid):
            do_evaluation = True
        else:
            do_evaluation = True
        return do_evaluation
            
    def update_studies(self,study_ids):
        self.existing_study_ids = study_ids

    def update_series(self,series_ids):
        self.existing_series_ids = series_ids
    
    def add_ids(self,study_instance_uid,series_instance_uid):
        self.existing_study_ids.add(study_instance_uid)
        self.existing_series_ids.add(series_instance_uid)
        #add_series(series_instance_uid)
        #add_study(study_instance_uid)

    def print_info(self):
        """
        Prints information about each policy in the list.
        """
        for policy in self.policies:
            policy.print_info()