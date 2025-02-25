class Rule:
    """
    Class representing a rule.
    
    Attributes:
        id (str): The ID of the rule.
        condition1_id (str): The ID of the first condition associated with the rule.
        condition2_id (str): The ID of the second condition associated with the rule.
        logical_operator (str): The logical operator used to combine the conditions.
        property_key (str): The key of the property the rule applies to.
        property_operator (str): The operator used to compare the property value.
        property_value (str): The value of the property to compare.
    """
    def __init__(self,rule):
        """
        Initialize a Rule object.
        
        Args:
            rule (dict): A dictionary containing information about the rule.
        """
        self.id = rule.get('_id') 
        self.condition1_id = rule.get('condition1_id')
        self.condition2_id = rule.get('condition2_id')
        self.logical_operator = rule.get('logical_operator')
        self.property_key = rule.get('property_key')
        self.property_operator = rule.get('property_operator') 
        self.property_value = rule.get('property_value')
    
    def get_property_key(self):
        """
        Get the key of the property the rule applies to.
        
        Returns:
            The key of the property.
        """
        return self.property_key
    
    def get_property_value(self):
        """
        Get the value of the property the rule applies to.
        
        Returns:
            The value of the property.
        """
        return self.property_value
    
    def get_property_operator(self):
        """
        Get the operator used to compare the property value.
        
        Returns:
            The operator used to compare the property value.
        """
        return self.property_operator
    
    def get_logical_operator(self):
        """
        Get the logical operator used to combine the conditions.
        
        Returns:
            The logical operator used to combine the conditions.
        """
        return self.logical_operator
    
    def print_info(self):
        """
        Print information about the rule.
        """
        print("\t-----------------------------------------")
        print("\tid", self.id)
        print("\tcondition1_id", self.condition1_id)
        print("\tcondition1_2d", self.condition2_id)
        print("\tlogical_operator", self.logical_operator)
        print("\tproperty_key", self.property_key)
        print("\tproperty_operator", self.property_operator)
        print("\tproperty_value",self.property_value)
        print("----------------------------------------")