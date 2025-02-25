import datetime
import operator
from xml.etree.ElementPath import ops
from datetime import timedelta

ops = {
    "-": operator.add, #opposit, because utc
    "+": operator.sub
}
    
class DateTime():
    """
        A class to represent DateTime as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        ...

        Attributes
        ----------
        dateTime_string : Str
            value for date: format = YYYYMMDD.
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

    def __init__(self,dateTime_string):
        self.date = self.parse_dateTime_string(dateTime_string)
        self.date_string = dateTime_string
        
    def parse_dateTime_string(self,dateTime_string: str):
        """
        Parse date String with format YYYYMMDDHHMMSS.FFFFFF&ZZXX

            Args:
            - dateTime_string: string to parse
            returns:
            -date string as  as datetime
        """
        length = len(dateTime_string)
        if length>26:
            raise ValueError(f"dateTime_string must have length of max 26 was {length}")
        
        year = int(dateTime_string[:4])
        month = int(dateTime_string[4:6])
        day = int(dateTime_string[6:8])
        hour = int(dateTime_string[8:10])
        minute = int(dateTime_string[10:12])
        second = int(dateTime_string[12:14])
        if(length>16):
            fractionalSecond = int(dateTime_string[15:21])
            andSymbol = dateTime_string[21:22]
            print(dateTime_string)
            utcHours = int(dateTime_string[22:24])
            utcMinutes = int(dateTime_string[24:26])
            d = datetime.datetime(year,month,day,hour,minute,second)
            op_func=ops[andSymbol]
            c=op_func(d,timedelta(hours=utcHours,minutes=utcMinutes))
            #FRACTIONALSECOND
            date = datetime.datetime(year, month, day,c.hour,minute,second)
        else:
            date = datetime.datetime(year, month, day,hour,minute,second)
        return date
    
    def get_info(self) -> (str, datetime):
        return (self.dateTime_string, self.date)
      
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