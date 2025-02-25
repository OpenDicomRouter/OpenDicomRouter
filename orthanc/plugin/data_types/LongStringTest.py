import unittest
from LongString import LongString


class TestLongString(unittest.TestCase):
    
    def test_equal_LongString(self):
        name1 = "WINDOW1 WINDOW2"
        name2 = "Window1"
        n1 = LongString(name1)
        n2 = LongString(name2)
        self.assertEqual(n1.contains(n2), True, "string comparison should result in True")


    ''''def test_equal_LongStringList(self):
        name1 = ['WINDOW1', 'WINDOW2']
        name2 = "Window1"
        n1 = LongString(name1)
        n2 = LongString(name2)
        self.assertEqual(n1.contains(n2), True, "string comparison should result in True")''''

if __name__ == '__main__':
    unittest.main()