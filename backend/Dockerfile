FROM 3.7-slim-stretch

RUN pip install pipenv
ENV PIPENV_VENV_IN_PROJECT=1

WORKDIR /app

COPY Pipfile .
COPY Pipefile.lock .
RUN pipenv install

ENV FLASK_ENV=production
COPY uwsgi.ini .
CMD ["pipenv", "run", "uwsgi", "uwsgi.ini"]
