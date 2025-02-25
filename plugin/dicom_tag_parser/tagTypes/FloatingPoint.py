class FloatingPoint:
    """
        A class to represent Floatingpoint as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        The code string datatype contains only characters and therefore only supports the contains and equal_to compare function.
        ...

        Attributes
        ----------
        value : float
            value for representation of Float
        _date : Date
            
        Methods
        -------
        info(additional=""):
            Prints the age and unit of the age string
        get_info(self) -> (int,str)
        get_possible_operations(self) -> [str]
        equal_to(self,other) -> bool
        contains(self,other) --> bool
        contains
            
    """
    
    def __init__(self,floating_point_number):
        self.value = floating_point_number
    
    def get_info(self) -> float:
        return self.value
      
    def greater_than(self,other) -> bool:
        return self.value > other.value

    def smaller_than(self,other) -> bool:
        return self.value < other.value
    
    def equal_to(self,other) -> bool:
        return self.value == other.value
    
    def get_possible_operations(self) -> [str]:
        return ["greater_than","smaller_than","equal_to"]
        
if __name__ == "__main__":
    print("Hello, World!")