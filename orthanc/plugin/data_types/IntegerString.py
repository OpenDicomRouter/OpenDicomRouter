class IntegerString:
    """
        A class to represent an Decimal  String as documented https://dicom.nema.org/dicom/2013/output/chtml/part05/sect_6.2.html.
        All Decimal Strings are internally represented as floating point values.

        A string of characters representing either a fixed point number or a floating point number. 
        A fixed point number shall contain only the characters 0-9 with an optional leading "+" or "-" and an optional "." 
        to mark the decimal point. A floating point number shall be conveyed as defined in ANSI X3.9, with an "E" or "e" to 
        indicate the start of the exponent.Decimal Strings may be padded with leading or trailing spaces. Embedded spaces are not allowed.

        ...

        Attributes
        ----------
        decimalString : String
            original value 
        value  : float
            original value as float
            
        Methods
        ---------------------------
        get_info(self) -> (int,str)
        greater_than(self,other) -> bool
        smaller_than(self,other) -> bool
        equal_to(self,other) -> bool
    """  
    def __init__(self,integer_string):
        integer = self.parse_integer_string(integer_string)
        self.integer_string = integer_string
        self.parse_integer_string = integer_string
        
    def parse_integer_string(self,integer_string: str):
        """
        Parse a decimal String

            Args:
            - decimalString : String    original value 
            - Returns  : float original value as float"
        """
        return int(integer_string)
    
    def get_info(self) -> (int, str):
        return (self.value, self.dec)
      
    def greater_than(self,other) -> bool:
        return self.integer_string > other.integer_string 

    def smaller_than(self,other) -> bool:
        return self.integer_string < other.integer_string 
    
    def equal_to(self,other) -> bool:
        return self.integer_string == other.integer_string
    
    def possible_operations(self) -> [str]:
        return ["greater than","smaller than","equal to"]

if __name__ == "__main__":
    print("Hello, World!")