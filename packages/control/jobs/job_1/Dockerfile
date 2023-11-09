# Python base image
FROM python:3.8-slim

# Install requirements
COPY requirements.txt .
RUN pip3 install -r requirements.txt --target /var/task

# Copy in the function code
COPY main.py /var/task