# Create our image based on Python 3.8
FROM python:3.8

# Expose ports
EXPOSE 3030

# Tell Python to not generate .pyc
ENV PYTHONDONTWRITEBYTECODE 1

# Turn off buffering
ENV PYTHONUNBUFFERED 1

# Install requirements using pip
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

# Set working directory and addour Flask API files
WORKDIR /ftpservice
ADD . /ftpservice

#RUN ls -la /ftpservice
#CMD ["tail", "-f", "/dev/null"]
CMD python3 upload.py