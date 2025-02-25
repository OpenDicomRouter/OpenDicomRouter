class DecimalString:
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
    def __init__(self,decimal_string):
        self.decimal_string = decimal_string
        
    def parse_decimal_strding(self,other: str):
        """
        Parse a decimal String

            Args:
            - decimalString : String    original value 
            - Returns  : float original value as float"
        """
        length = len(other)
        other_long_string = [str(word).strip().lower() for word in other]
        stripped_decimal_string = other_long_string.strip()
        value = float(stripped_decimal_string)
        return value
    
    def get_info(self) -> (int, str):
        return (self.value, self.dec)
      
    def greater_than(self,other) -> bool:
        return self.decimal_string > other.decimal_string 

    def smaller_than(self,other) -> bool:
        return self.decimal_string < other.decimal_string 
    
    def contains(self,str_value) -> bool:
        self_decimal_string = self.decimal_string.strip().lower()
        return  str_value.decimal_string.strip().lower() in self_decimal_string
    
    def possible_operations(self) -> [str]:
        return ["greater than","smaller than","contains"]

if __name__ == "__main__":
    print("Hello, World!")