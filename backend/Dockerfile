FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-slim

RUN apt-get update && apt-get install -y gcc

RUN pip install pipenv

WORKDIR /app

COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv install --system

COPY icfpc2019/app.py ./icfpc2019/app.py
COPY main.py .
