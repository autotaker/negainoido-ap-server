FROM python:3.7

RUN apt-get update && apt-get install -y build-essential libpcre3 libpcre3-dev

RUN pip install pipenv
ENV PIPENV_VENV_IN_PROJECT=1

WORKDIR /app

COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv install

ENV FLASK_ENV=production
COPY uwsgi.ini .
COPY icfpc2019/app.py ./icfpc2019/app.py
COPY main.py .
CMD ["pipenv", "run", "uwsgi", "uwsgi.ini"]
