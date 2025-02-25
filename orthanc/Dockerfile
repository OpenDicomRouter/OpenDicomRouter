FROM jodogne/orthanc-plugins

RUN apt update -y && apt upgrade -y
RUN apt-get -y install python3 python3-pip

ADD ./download-python.sh ./download-python.sh
RUN bash ./download-python.sh
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install python3.7 libpython3.7 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm ./download-python.sh

ADD requirements.txt .
RUN python3 -m pip install -r requirements.txt

ADD ./plugin/ /usr/local/share/orthanc/plugins/
RUN ls /usr/local/share/orthanc/plugins/
RUN ls /etc/orthanc/

# ADD ./plugin /etc/orthanc/
# https://groups.google.com/d/msg/orthanc-users/qWqxpvCPv8g/Z8huoA5FDAAJ
ENV MALLOC_ARENA_MAX 5

ENTRYPOINT [ "Orthanc" ]
CMD [ "/etc/orthanc/" ]