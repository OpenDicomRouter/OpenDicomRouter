# System Description

The goal is to achieve a dockerized system that allows to route DICOM files or trigger actions based on a rule system. Orthanc is an open source project for storing and managing medical image data. It provides the ability to integrate Python plugins. Therefore, a web application is created to create rules. 

The whole system is built using docker compose with several docker containers:

- Orthanc
- Frontend (React.JS) application
- Backend API (Flask)
- MongoDB for storing the data

![Updated_Sys_Diagram.drawio.png](System%20Description%204153ee730dfd400eb89552d0245fef01/Updated_Sys_Diagram.drawio.png)


#