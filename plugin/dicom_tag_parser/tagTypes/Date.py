import datetime
class Date:
    """
        A class to represent Date as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        The code string datatype contains only characters and therefore only supports the contains and equal_to compare function.
        ...

        Attributes
        ----------
        date_string : Str
            value for date: format = YYYYMMDD
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
    
    def __init__(self,date_string):
        self.date = self.parse_date_string(date_string)
        self.date_string = date_string
        
    def parse_date_string(self,date_string: str):
        """
        Parse date String with format YYYYMMDD

            Args:
            - date_string: string to parse
            returns:
            -date string as  as datetime
        """
        length = len(date_string)
        if length!=8:
            raise ValueError(f"date_string must have length of 8 was {length}")
        
        year = int(date_string[:4])
        month = int(date_string[4:6])
        day = int(date_string[6:])
        
        date = datetime.datetime(year, month, day)
        return date
    
    def get_info(self) -> (str, datetime):
        return (self.date_string, self.date)
      
    def greater_than(self,other) -> bool:
        return self.date > other.date

    def smaller_than(self,other) -> bool:
        return self.date < other.date
    
    def equal_to(self,other) -> bool:
        return self.date == other.date
    
    def get_possible_operations(self) -> [str]:
        return ["greater_than","smaller_than","equal_to"]
if __name__ == "__main__":
    print("Hello, World!")