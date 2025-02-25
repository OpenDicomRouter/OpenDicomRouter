import unittest
from DecimalString import DecimalString

class TestDecimapString(unittest.TestCase):
    
    def test_operations(self):
        ageString = DecimalString("002M")
        possible_operations = ageString.get_possible_operations()
        self.assertTrue("smaller_than" in possible_operations, "must contain smaller_than")
        self.assertTrue("greater_than" in possible_operations, "must contain greater than")
        self.assertTrue("equal_to" in possible_operations, "must contain greater than")

    def test_smaller_than(self):
        age_string1 = "020M"
        age_string2 = "021M"
        as1 = AgeString(age_string1)
        as2 = AgeString(age_string2)
        self.assertEqual(as1.smaller_than(as2), True, "Age comparison should result in True")

    def test_greater_than(self):
        age_string1 = "020M"
        age_string2 = "021M"
        as1 = AgeString(age_string1)
        as2 = AgeString(age_string2)
        self.assertEqual(as2.greater_than(as1), True, "Age comparison should result in True")
    
    def test_greater_than_year_month(self):
        age_string1 = "020M"
        age_string2 = "021Y"
        as1 = AgeString(age_string1)
        as2 = AgeString(age_string2)
        self.assertEqual(as2.greater_than(as1), True, "Age comparison should result in True")
    

if __name__ == '__main__':
    unittest.main()