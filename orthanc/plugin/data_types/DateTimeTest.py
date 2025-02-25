from email.utils import parsedate_to_datetime
import unittest
from DateTime import DateTime

"""
20010301125745.490000 => 2001-03-01 12:57:45
20010301125745.490000-0500 => 2001-03-01 17:57:45
20010301125745.490000+0000 => 2001-03-01 12:57:45
20010301125745.490000-0000 => 2001-03-01 12:57:45
20010301125745.490000+0700 => 2001-03-01 05:57:45
"""

class TestDateTime(unittest.TestCase):
    
    def test_operations(self):
        dateTimeString = DateTime("19530827111300.0")
        possible_operations = dateTimeString.get_possible_operations()
        self.assertTrue("smaller_than" in possible_operations, "must contain smaller_than")
        self.assertTrue("greater_than" in possible_operations, "must contain greater than")
        self.assertTrue("equal_to" in possible_operations, "must contain greater than")

    def test_smaller_thanYearMonthDay(self):
        datetime1 = "20010301125745.0" #2001-03-01 12:57:45
        datetime2 = "20020827111300.0" #2002-08-27 11:13:00
        dt1 = DateTime(datetime1)
        dt2 = DateTime(datetime2)
        self.assertEqual(dt1.smaller_than(dt2), True, "datetime comparison should result in True")

    def test_smaller_thanYearMonthDayUTC(self):
        datetime1 = "20010301125745.490000-0000" #2001-03-01 12:57:45
        datetime2 = "20010301125745.490000-0500" #2001-03-01 17:57:45
        dt1 = DateTime(datetime1)
        dt2 = DateTime(datetime2)
        self.assertEqual(dt1.smaller_than(dt2), True, "datetime comparison should result in True")


    def test_equal_UTC(self):
        datetime1 = "20010301125745.490000+0000" #2001-03-01 12:57:45
        datetime2 = "20010301125745.490000-0000" #2001-03-01 12:57:45
        dt1 = DateTime(datetime1)
        dt2 = DateTime(datetime2)
        self.assertEqual(dt1.equal_to(dt2), True, "datetime comparison should result in True")

    def test_greater_than(self):
        datetime1 = "20020827111300.0" #2002-08-27 11:13:00
        datetime2 = "20010827111300.0" #2001-03-01 11:13:00
        dt1 = DateTime(datetime1)
        dt2 = DateTime(datetime2)
        self.assertEqual(dt1.greater_than(dt2), True, "datetime comparison should result in True")
  
    def test_greater_thanUTC(self):
        datetime1 = "20010301125745.490000-0500" #2001-03-01 17:57:45
        datetime2 = "20010301125745.490000+0700" #2001-03-01 05:57:45
        dt1 = DateTime(datetime1)
        dt2 = DateTime(datetime2)
        self.assertEqual(dt1.greater_than(dt2), True, "datetime comparison should result in True")
    

if __name__ == '__main__':
    unittest.main()