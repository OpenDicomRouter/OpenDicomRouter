from xml.etree.ElementPath import ops

class ShortString():
    """
        A class to represent shortString as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        The short string datatype contains only characters and therefore only supports the contains and equal_to compare function.
        ...

        Attributes
        ----------
        shortString_string : Str
            value for shortString: format = "test1 test2 test3 test4 test5"
                                         = ['WINDOW1', 'WINDOW2']
            
        Methods
        -------
        equal_to(self,other) -> bool
    """

    def __init__(self,short_string):
        self.short_string = short_string

    def get_info(self) -> str:
        return self.short_string.replace("/"," ")
      
    def equal_to(self,other) -> bool:
        other_short_string = [word.strip().lower() for word in other.short_string]
        self_short_string = self.short_string.strip().lower()
        self_short_string.replace("/"," ")
        return self_short_string == other_short_string
    
    def contains(self,str_value) -> bool:
        self_short_string = self.short_string.strip().lower()
        self_short_string.replace("/"," ")
        return  str_value.short_string.strip().lower() in self_short_string

    def possible_operations(self) -> [str]:
        return ["equal to","contains"]
    
        
if __name__ == "__main__":
    print("Hello, World!")