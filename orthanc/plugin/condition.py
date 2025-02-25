
from rule import Rule
class Condition():
    """
    Represents a condition in a policy.
    """

    condition_id = None
    property_type = None
    policy_id = None
    property_key = None
    property_operator = None
    property_value = None
    description = None

    def __init__(self, condition_information):
        """
        Initialize the Condition instance with the given condition information.
        :param condition_information: A dictionary containing condition information
        """
        self.condition_id = condition_information.get('_id')
        self.policy_id = condition_information.get('policy_id')
        self.property_key = condition_information.get('property_key')
        self.property_operator = condition_information.get('property_operator')
        self.property_value = condition_information.get('property_value')
        self.description = condition_information.get('description')

    def print_info(self):
        """
        Print the information of the condition, including its properties and rules.
        """
        print("\t-----------------------------------------")
        print("\tcondition_id", self.condition_id)
        print("\tpolicy_id", self.policy_id)
        print("\tproperty_key", self.property_key)
        print("\tproperty_operator", self.property_operator)
        print("\tproperty_value", self.property_value)
        print("\tdescription", self.description)
        print("\t*******************************\n Rules : ")
        print("\t----------------------------------------")