class AgeString:
    """
        A class to represent an Age String as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        All age strings ar transformed to have a unit of 'D'. This reduces the complexity for comparison and allows us to 
        ignore certain edge cases.
        ...

        Attributes
        ----------
        age : Int
            value for age
        Unit : str
            Unit of age value. Could be W,M,Y
            
        Methods
        -------
        info(additional=""):
            Prints the age and unit of the age string
        get_info(self) -> (int,str)
        greater_than(self,other) -> bool
        smaller_than(self,other) -> bool
        equal_to(self,other) -> bool
            
    """
    allowed_units = ["D","W","M","Y"]
    
    def __init__(self,age_string):
        age = self.parse_age_string(age_string)
        self.age = age
        self.unit = "D"
        
    def parse_age_string(self,age_string: str):
        """
        Parse an age String with format nnnX where X can be D,W,M,Y and n represents a number

            Args:
            - age_string: string to parse
            returns:
            - number as integer
            - one of "Day","Week","Month",Year"
        """
        length = len(age_string)
        if length!=4:
            raise ValueError(f"age_string must have length of 4 was {length}")
        if not age_string[3] in self.allowed_units:
            raise ValueError(f"age_string must be a unit character from {self.allowed_units} ")
 
        
        age = int(age_string[:3])
        unit =  age_string[3]
        
        age_in_days = self.transform_to_days(age,unit)
        
        return age_in_days
    
    def transform_to_days(self,age,unit):
        """
        Function that transforms the ageString to days to make it comparable
        Parameters:
            -age: Integer representing the age of a patient according to units
            -unit: String "D","W","M","Y" representing the unit of age
        Returns: 
            - age in days
        """
        if unit == "Y":
            new_age = age * 365
        if unit == "M":
            new_age = age*30
        if unit == "W":
            new_age = age * 7
        return new_age
    
    def get_info(self) -> (int, str):
        return (self.age, self.unit)
      
    def greater_than(self,other) -> bool:
        return self.age > other.age 

    def smaller_than(self,other) -> bool:
        return self.age < other.age 
    
    def equal_to(self,other) -> bool:
        return self.age == other.age
    
    def get_possible_operations(self) -> [str]:
        return ["greater_than","smaller_than","equal_to","contains"]

if __name__ == "__main__":
    print("Hello, World!")


