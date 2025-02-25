from xml.etree.ElementPath import ops

class UniqueIdentifier():

    def __init__(self,uniqueIdentifier_string,char:str):
        self.uniqueIdentifier = self.parse_uniqueIdentifier_string(uniqueIdentifier_string,char)
    
    def equal_to(self,other) -> bool:
        return self.uniqueIdentifier == other.uniqueIdentifier
    
    def contains(self,str_value) -> bool:
        return  str_value.uniqueIdentifier in self.uniqueIdentifier
    
    def get_possible_operations(self) -> [str]:
        return ["equal to","contains"]
        
if __name__ == "__main__":
    print("Hello, World!")