from xml.etree.ElementPath import ops
from datetime import time

max = 14
min=6 
class Time():
    """
        A class to represent time as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        The code string datatype contains only characters and therefore only supports the contains and equal_to compare function.
        ...

        Attributes
        ----------
        time_string : Str
            value for date: format = HHMMSS
            
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

    def __init__(self,time_string):
        self.date = self.parse_time_string(time_string)
        self.date_string = time_string
        
    def parse_time_string(self,time_string: str):
        """
        Parse time String with format HHMMSS

            Args:
            - time_string: string to parse
            returns:
            -time string as  as time
        """
    

        length = len(time_string)
        if length>max:
            raise ValueError(f"time_string must have length of max 14 was {length}")
        
        hour = int(time_string[:2])
        minute = int(time_string[2:4])
        second = int(time_string[4:6])
    

        
        """if(length>min):
            fractionalSecond = int(time_string[7:13])
            date = time.time(hour,minute,second,microsecond=int(fractionalSecond*1000000))
        else:"""
        
        date = time(hour,minute,second)

        return date
    
    def get_info(self) -> (str, time):
        return (self.time_string, self.date)
      
    def greater_than(self,other) -> bool:
        return self.date > other.date

    def smaller_than(self,other) -> bool:
        return self.date < other.date
    
    def equal_to(self,other) -> bool:
        return self.date == other.date
    
    def possible_operations(self) -> [str]:
        return ["greater than","smaller than","equal to"]
        
if __name__ == "__main__":
    print("Hello, World!")