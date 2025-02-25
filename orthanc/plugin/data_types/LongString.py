from xml.etree.ElementPath import ops

class LongString():
    """
        A class to represent LongString as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        The long string datatype contains only characters and therefore only supports the contains and equal_to compare function.
        ...

        Attributes
        ----------
        longString_string : Str
            value for longString: format = "test1 test2 test3 test4 test5"
                                         = ['WINDOW1', 'WINDOW2']
            
        Methods
        -------
        equal_to(self,other) -> bool
    """

    def __init__(self,long_string):
        self.long_string = long_string

    def get_info(self) -> str:
        return self.long_string
      
    def equal_to(self,other) -> bool:
        other_long_string = [word.strip().lower() for word in other.long_string]
        self_long_string = self.long_string.strip().lower()
        return self_long_string == other_long_string
    
    def contains(self,str_value) -> bool:
        self_long_string = self.long_string.strip().lower()
        return  str_value.long_string.strip().lower() in self_long_string

    def possible_operations(self) -> [str]:
        return ["equal to","contains"]
    
        
if __name__ == "__main__":
    print("Hello, World!")