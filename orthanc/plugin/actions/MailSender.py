import requests

class SendMailAction():
    service_address = ""
    service_id = ""
    def __init___(self,configuration):
        self.service_address = configuration.address
        self.service_id = configuration.service_id
        
    def run_action(self,mail_content):
        request_data = mail_content.to_dict()
        requests.post(url=self.service_address,json=request_data)



