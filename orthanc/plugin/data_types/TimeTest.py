from email.utils import parsedate_to_datetime
import unittest
from Time import Time

class TestDateTime(unittest.TestCase):
    
    def test_operations(self):
        dateTimeString = Time("070907")
        possible_operations = dateTimeString.get_possible_operations()
        self.assertTrue("smaller than" in possible_operations, "must contain smaller_than")
        self.assertTrue("greater than" in possible_operations, "must contain greater than")
        self.assertTrue("equal to" in possible_operations, "must contain greater than")

    def test_smaller_thanTime(self):
        datetime1 = "070907"
        datetime2 = "070908" 
        dt1 = Time(datetime1)
        dt2 = Time(datetime2)
        self.assertEqual(dt1.smaller_than(dt2), True, "time comparison should result in True")


    def test_greater_thanTime(self):
        datetime1 = "070917" 
        datetime2 = "070907" 
        dt1 = Time(datetime1)
        dt2 = Time(datetime2)
        self.assertEqual(dt1.greater_than(dt2), True, "time comparison should result in True")


    def test_equal_Time(self):
        datetime1 = "070907" 
        datetime2 = "070907" 
        dt1 = Time(datetime1)
        dt2 = Time(datetime2)
        self.assertEqual(dt1.equal_to(dt2), True, "time comparison should result in True")

    """
    def test_smaller_thanFraction(self):
        datetime1 = "070907.0705" #2001-03-01 12:57:45
        datetime2 = "070907.0706" #2001-03-01 17:57:45
        dt1 = Time(datetime1)
        dt2 = Time(datetime2)
        self.assertEqual(dt1.smaller_than(dt2), True, "time comparison should result in True")


    def test_equal_Fraction(self):
        datetime1 = "070907.0705" #2001-03-01 12:57:45
        datetime2 = "070907.0705" #2001-03-01 12:57:45
        dt1 = Time(datetime1)
        dt2 = Time(datetime2)
        self.assertEqual(dt1.equal_to(dt2), True, "time comparison should result in True")

    def test_greater_thanFraction(self):
        datetime1 = "070907.0705" #2001-03-01 17:57:45
        datetime2 = "070907.0705" #2001-03-01 05:57:45
        dt1 = Time(datetime1)
        dt2 = Time(datetime2)
        self.assertEqual(dt1.greater_than(dt2), True, "time comparison should result in True")
    """

if __name__ == '__main__':
    unittest.main()