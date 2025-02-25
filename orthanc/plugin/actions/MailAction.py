class MailObject():
    content = ""
    subject = ""
    to = []
    def __init__(self,content,subject,to):
        if len(to) == 0:
            raise ValueError(f"Recipient List must not be empty")
        self.content = self.add_message_to_template(content)
        self.subject = self.init_subject(subject)


    def add_message_to_template(self,content):
        mail_content = "<p>" + \
                        "<h2>" + "Mail Alert From DICOM Router </h2>"\
                        + content + \
                        "</p>" 
        return mail_content

    def init_subject(self,subject):
        if subject != "":
            self.subject = subject
        else: 
            self.subject = "Mail Alert from Dicom Router"

    def to_dict(self):
        data_dict = {
            'recipient' : self.to,
            'subject' : self.subject,
            'body' : self.content
        }