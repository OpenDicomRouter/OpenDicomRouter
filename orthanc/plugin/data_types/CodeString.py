class CodeString:
    """
        A class to represent an Code String as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        The code string datatype contains only characters and therefore only supports the contains and equal_to compare function.
        ...

        Attributes
        ----------
        code_string : Str
            value for age
            
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
    
    def __init__(self,code_string):
        self.code_string = code_string

    def get_info(self) -> str:
        return self.code_string
      
    
    def equal_to(self,other) -> bool:
        #other_code_string = other.code_string.strip().lower()
        #self_code_string = self.code_string.strip().lower()
        print("1**************")
        print(other)
        print("2**************")
        other_code_string = other.code_string
        self_code_string = self.code_string
        return self_code_string == other_code_string
    
    def contains(self,str_value) -> bool:
        #self_code_string = self.code_string.strip().lower()
        self_code_string = self.code_string.lower()
        return  str_value.strip().lower() in self_code_string

    def possible_operations(self) -> [str]:
        return ["equal to","contains"]

if __name__ == "__main__":
    print("Hello, World!")