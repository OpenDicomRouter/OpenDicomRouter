
#from sqlite3 import Time
from symbol import factor
from .AgeString import AgeString
from .DateTime import DateTime
from .LongString import LongString
from .ShortString import ShortString
from .PersonName import PersonName
from .Date import Date
from .DecimalString import DecimalString
from .FloatingPoint import FloatingPoint
from .CodeString import CodeString
from .IntegerString import IntegerString
from .Time import Time
from .SignedLong import SignedLong
from .UniqueIdentifier import UniqueIdentifier
from .UnsignedShort import UnsignedShort

class DataTypeFactory():
    dicom_types = {}

    def __init__(self):
        self.dicom_types = {
        "AS" : AgeString,
        "DT" : DateTime,
        "LO" : LongString,
        "SH" : ShortString,
        "PN" : PersonName,
        "TM" : Time,
        "DA" : Date,
        "DS" : DecimalString,
        "FL" : FloatingPoint,
        "FD" : FloatingPoint,
        "CS" : CodeString,
        "IS" : IntegerString,
        "SL" : SignedLong,
        "UI" : UniqueIdentifier,
        "US" : UnsignedShort
        }

    def create_instance(self,type,value,separator=" "):
        datatype_object_class = self.dicom_types.get(type)
        if datatype_object_class is not None:
            if type == "PN":
                return  datatype_object_class(value,separator)
            else:
                return datatype_object_class(value)
        else:
            return None
    
if __name__ == "__main__":  
        factory = DataTypeFactory()
        print("factory : ", factory, " \n", factory.dicom_types)
        age_string1 = factory.create_instance("AS","080Y")
        age_string2 =  factory.create_instance("AS","069Y")
        eval_val = age_string1.greater_than(age_string2)
        print("evaluate : ",eval_val)
        
        


