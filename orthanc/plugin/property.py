class Property:
    """
    Class representing a property in DICOM data.

    Attributes:
        key_word (str): The keyword for the property.
        name (str): The name of the property.
        data_type (str): The data type of the property.
    """

    def __init__(self, data):
        """
        Initialize a Property object from a dictionary.

        Args:
            data (dict): A dictionary containing the property information.
        """
        self.key_word = data.get('Keyword')
        self.name = data.get("Name")
        self.data_type = data.get("VR")

    def print_info(self):
        """
        Print the information of the property.
        """
        print("------------------------------")
        print("Keyword : ", self.key_word)
        print("name : ", self.name)
        print("data type : ", self.data_type)
        print("------------------------------")