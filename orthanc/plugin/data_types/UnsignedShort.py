class UnsignedShort:
    
    def __init__(self,unsignedShort_number):
        self.value =  int(unsignedShort_number)
    
    def get_info(self) -> int:
        return self.value
      
    def greater_than(self,other) -> bool:
        return self.value > other.value

    def smaller_than(self,other) -> bool:
        return self.value < other.value
    
    def equal_to(self,other) -> bool:
        return self.value == other.value
    
    def possible_operations(self) -> [str]:
        return ["greater than","smaller than","equal to"]