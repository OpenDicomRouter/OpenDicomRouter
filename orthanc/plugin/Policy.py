from rule import Rule
from condition import Condition
from api_bridge import get_policies, get_rules,get_conditions, get_actions
from data_types.DataTypeFactory import DataTypeFactory
from action import ActionFactory
from functools import reduce

class Policy():
    """
    Represents a policy with rules and conditions for processing DICOM data.
    """
    policy_id = None
    policy_name = None
    policy_active = False
    policy_anonymize = False
    policy_actionExecutionType = "OnSeries"
    policy_created = None
    policy_updated = None
    policy_user = None
    policy_user_name = None
    policy_description = None
    information = {}
    conditions = {str:Condition}
    rules = []
    actions = []
    
    def __init__(self,policy_information, actions=None):
        """
        Initialize the Policy instance with the given policy information and actions.
        :param policy_information: A dictionary containing policy information
        :param actions: A list of actions associated with the policy (optional)
        """
        self._init_policy_information(policy_information) 
        self._create_conditions_list(self.policy_id)
        self._create_conditions_list(self.policy_id)
        self._create_rule_list(self.policy_id)
        self._create_actions_list(self.policy_id)
    
    def _init_policy_information(self,policy_information):
        self.policy_id = policy_information.get('policy_id')
        self.policy_active = policy_information.get('policy_active')
        self.policy_name = policy_information.get('policy_name')
        self.policy_anonymize = policy_information.get('policy_anonymize')
        self.policy_created = policy_information.get('policy_created')
        self.policy_updated = policy_information.get('policy_updated')
        self.policy_user = policy_information.get('policy_user')
        self.policy_user_name = policy_information.get('policy_user_name')
        self.policy_description = policy_information.get('policy_description')
        self.policy_actionExecutionType = policy_information.get('policy_actionExecutionType')

    def _create_conditions_list(self,policy_id):
        raw_conditions = get_conditions(policy_id)
        conditions = {}
        for raw_condition in raw_conditions:
            condition = Condition(raw_condition)

            conditions[condition.condition_id] = condition
        self.conditions = conditions

    def _create_rule_list(self,policy_id):
        raw_rules = get_rules(policy_id)
        rules = []
        for raw_rule in raw_rules:
            for key in raw_rule.keys():
                print(f"Key : {key} , value : {raw_rule.get(key)}")
            rule = Rule(raw_rule)
            rule.print_info()
            rules.append(rule)
        self.rules = rules  

    def _create_actions_list(self,policy_id):
        raw_actions = get_actions(policy_id) 
        for raw_action in raw_actions:
            action = ActionFactory.create_action(raw_action['objectType'],raw_action)
            self.actions.append(action)
            action.printInfo()
        
    def is_active(self) ->bool:
        return self.active
    
    def anonymize_data(self) -> bool:
        return self.anonymize
    
    def get_rules(self):
        return self.rules
     
    def get_operator_func(self,datatype_obj, condition):
        #TODO : REMOVE Equals in Backend and frontend
        datatype_operation = None
        if condition.property_operator in datatype_obj.possible_operations()+["equals"]:
            if condition.property_operator == "greater than":
                datatype_operation =  datatype_obj.greater_than
            elif condition.property_operator == "smaller than":
                datatype_operation =  datatype_obj.smaller_than
            elif condition.property_operator == "equal to":
                datatype_operation =  datatype_obj.equal_to
            elif condition.property_operator == "equals":
                datatype_operation =  datatype_obj.equal_to
            elif condition.property_operator == "contains":
                datatype_operation =  datatype_obj.contains
        return datatype_operation
    
    def eval_conditions(self,dicom_data):
        keys = self.conditions.keys()
        evaluated_conditions = {}
        datatype_factory = DataTypeFactory()
        for key in keys:      
            condition = self.conditions.get(key)
            try:
                elem = dicom_data.data_element(condition.property_key)
            except:
                elem = None

            if elem and condition:
                tag_data = elem.value
                value_representation = elem.VR
                dicom_datatype_object = datatype_factory.create_instance(value_representation,tag_data)
                condition_data = condition.property_value

                condition_datatype_object = datatype_factory.create_instance(value_representation,condition_data)
                fn = self.get_operator_func(dicom_datatype_object,condition)
                evluation_result = fn(condition_datatype_object)
                evaluated_conditions[key] = evluation_result 
            else:
                evaluated_conditions[key] = False 

        return evaluated_conditions

    
    def eval_rule(self,rule,condition1,condition2):
        if rule.logical_operator == "AND":
            return condition1 and condition2
        else:
            return condition1 or condition2

    def eval_rules(self,evaluated_conditions):
        evaluated_rules = {}
        for rule in self.rules:
            condition1 = evaluated_conditions.get(rule.condition1_id)
            condition2 = evaluated_conditions.get(rule.condition2_id)
            if (condition1 is not None) and (condition2 is not None):
                rule_evaluation_result = self.eval_rule(rule,condition1,condition2) 
                evaluated_rules[rule.id] = rule_evaluation_result           
        return evaluated_rules

    def evaluate(self,dicom_data):
        try:
            evaluated_conditions = self.eval_conditions(dicom_data)
            if len(self.rules) == 0:
                evaluation_result = reduce(lambda x,y: x and y,list(evaluated_conditions.values()),True) 
            else:
                evaluated_rules = self.eval_rules(evaluated_conditions)
                evaluation_result = reduce(lambda x,y: x and y,list(evaluated_rules.values()),True) 
        except:
            evaluation_result = False
        return evaluation_result
        
    def run_actions(self,dicom_file,dicom_data,series_instance_uid,study_instance_uid,instance_uid):
        for action in self.actions:
            action.execute(dicom_file,dicom_data,series_instance_uid,study_instance_uid,instance_uid)
        
    
    def print_info(self):
        print("-----------------------------------------")
        print("policy_id", self.policy_id)
        print("policy_active", self.policy_active)
        print("policy_name", self.policy_name)
        print("polucy_anonymize", self.policy_anonymize)
        print("policy_created", self.policy_created)
        print("policy_updated", self.policy_updated)
        print("policy_user_name", self.policy_user_name)
        print("policy_user",self.policy_user)
        print("policy_description", self.policy_description)
        print('policy_actionExecutionType',self.policy_actionExecutionType)
        print("*******************************\n Rules : ")
        for rule in self.rules:
            rule.print_info()
        print("********************************")

        print("*******************************\n Conditions : ")
        for condition_key in self.conditions.keys():
            condition = self.conditions.get(condition_key)
            print( condition.print_info() )
        print("********************************")
        print("----------------------------------------")