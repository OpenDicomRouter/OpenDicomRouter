import unittest
from PersonName import PersonName


class TestPersonName(unittest.TestCase):
    
    def test_equal_Name(self):
        name1 = "John^Robert^Quincy^B.A. M.Div."
        name2 = "John-Robert-Quincy-B.A. M.Div."
        n1 = PersonName(name1,"^")
        n2 = PersonName(name2,"-")
        self.assertEqual(n1.equal_to(n2), True, "string comparison should result in True")

    def test_equal_NameDoubleChars(self):
        name1 = "John^Robert^^B.A. m.Div."
        name2 = "-John---Robert B.A. M.Div."
        n1 = PersonName(name1,"^")
        n2 = PersonName(name2,"-")
        self.assertEqual(n1.equal_to(n2), True, "string comparison should result in True")

    def test_equal_NameContains(self):
        n1 = PersonName("John^Robert^^B.A. m.Div.","^")
        n2 = PersonName("robert","^")
        self.assertEqual(n1.contains(n2), True, "string comparison should result in True")

if __name__ == '__main__':
    unittest.main()