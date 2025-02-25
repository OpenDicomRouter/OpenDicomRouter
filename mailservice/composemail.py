import datetime
import os
import re
 
from flask import Flask, Response, request
from flask import Flask, jsonify, request, json 

import uuid
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText  # for sending text-only messages
from serverconnection import connect2server, credentials
import smtplib
import ssl
import copy
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re
import jinja2

regex_email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'


templateEnv = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath="./templates"))
templateEnv.globals.update()

app = Flask(__name__)
CORS(app)


@app.route('/test', methods=["GET"])
def getTest():
    print("Test called")
    result = {
        "id":1,
        "value":10
    }
    return jsonify({'result' : result})

@app.route("/mail_w_conf", methods=['POST'])
def send_mail_with_passed_config():
    # try and except method
    print("sending mail.....")
    try:
        # if it is a post request
        if request.method == 'POST':
            content = request.json
            # CONNECT TO SERVER
            config = content['smtp_config']
            content = content['mail']

            mail_sender = MailSender(config["smtp_host"],config["smtp_port"],config["user"],config["password"],config["from_addr"])
            
            mail = Mail(mail_sender)
            mail.add_recipients([content["to"]])
            mail._subject = content["subject"]
            mail.load_message_template('example_content.html', {
                'to': content["to"],
                'body': content["message"],
                'link': content["link"]
            })
            mail.send()
            return jsonify({'result' : "Mail sent"})
    except Exception as e:
        print(e)
        return jsonify({'result' : f'<p>{e} </p>'})



class MailSender:
    context = None
    server = None

    def __init__(self,smtp_server,port,smtp_user,smtp_password,from_email_addr):
        self.context = ssl.create_default_context()
        self.server = smtplib.SMTP(smtp_server,port)
        self.server.starttls(context=self.context)
        self.server.login(smtp_user, smtp_password)
        self.from_email_addr = from_email_addr
         

    def send_message(self, to, message):
        if isinstance(to, str):
            to = [to]
        if validate_email(to) and isinstance(message, str) and isinstance(to, list):
            for receiver in to:
                self.server.sendmail(self.from_email_addr, receiver, message)
                print(f"Mail sent to {receiver} with message: {message}")

    def send_html(self, to, subject, html_string):
        if isinstance(to, str):
            to = [to]
        if validate_email(to) and isinstance(html_string, str) and isinstance(to, list):
            message = MIMEMultipart("alternative")
            message['From'] = "Dicom Routing" + '<' + self.from_email_addr + '>'

            message["Subject"] = str(subject)
            message.attach(MIMEText(html_string, 'html'))
            for receiver in to:
                self.server.sendmail(self.from_email_addr, receiver,message.as_string())
                print(f"Mail sent to {receiver} with subject: {subject}")

    def quit(self):
        self.server.quit()

class Mail:
    _subject_max_length = 78

    def __init__(self,mail_sener):
        self._to = []
        self._subject = ''
        self._html_message = ''
        self.mail_sender = mail_sener

    @property
    def subject(self):
        return self._subject

    @property
    def to(self):
        return self._to

    @property
    def html_message(self):
        return self._html_message


    @subject.setter
    def subject(self, subject):
        if isinstance(subject, str) and len(subject) < self._subject_max_length:
            self._subject = subject

    @to.setter
    def to(self, to):
        if isinstance(to, list) and validate_email(to):
            self._to = to

    @html_message.setter
    def html_message(self, message):
        if isinstance(message, str):
            self._html_message = message

    def load_message_template(self, template_name, variables):
        template = templateEnv.get_template(template_name)
        self.html_message = template.render(**variables)

    def add_recipients(self, receivers):
        if not isinstance(receivers, list):
            receivers = [receivers]
        self.to += receivers

    def send(self):
        if self.to:
            srv = self.mail_sender
            srv.send_html(self.to, self.subject, self.html_message)
            srv.quit()

def validate_email(emails):
    if not isinstance(emails, list):
        emails = [emails]
    if all(re.fullmatch(regex_email, email) for email in emails):
        return True
    else:
        return False
print("APP is running....", app.url_map)
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=2020,debug=True)
    print("APP is running....", app.url_map)
