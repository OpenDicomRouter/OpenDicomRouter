from xml.etree.ElementPath import ops

class PersonName():
    """
        A class to represent PersonName as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        The personName datatype contains only characters and therefore only supports the contains and equal_to compare function.
        ...

        Attributes
        ----------
        personName_string : Str
            value for personName: format = e.g. FirstName^MiddleName^LastName^Title
            
        Methods
        -------
        equal_to(self,other) -> bool
    """

    def __init__(self,personName_string,char:str):
        self.personName = self.parse_personName_string(personName_string,char)
        
    def parse_personName_string(self,personName_string: str,char:str):
        """
        Replace special characters e.g. '^' from PersonName attribute
            Args:
            - personName_string: string to parse
            returns: string, with single space between words
        """
        strWithoutChars = str(personName_string).replace(char, ' ')
        strWithOneSpace = " ".join(strWithoutChars.split())
        return strWithOneSpace
    
    def equal_to(self,other) -> bool:
        self.personName = self.personName.strip().lower()
        other.personName = other.personName.strip().lower()
        return self.personName == other.personName
    
    def contains(self,str_value) -> bool:
        personName = self.personName.strip().lower()
        return  str_value.personName.strip().lower() in personName
    
    def possible_operations(self) -> [str]:
        return ["equal to","contains"]
        
if __name__ == "__main__":
    print("Hello, World!")