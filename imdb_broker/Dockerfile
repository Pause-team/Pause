FROM python:3.6.3

MAINTAINER Anish Gupta

ENV FLASK_APP=/home/main.py

EXPOSE 5000

WORKDIR /home

COPY main.py requirements.txt /home/

RUN pip install -r requirements.txt

CMD flask run
