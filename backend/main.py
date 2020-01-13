from flask import Flask, jsonify
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
import icfpc2019.app as icfpc2019


import os

app = Flask(__name__)

dbconfig = {
    "database": os.getenv('DB_NAME') or 'negainoido',
    "user": os.getenv('DB_USER') or 'negainoido',
    "password": os.getenv('DB_PASS') or 'negainoido',
    "charset": 'utf8mb4',
    "collation": 'utf8mb4_bin',
    "pool_name": 'dbpool'
}

if os.getenv('DB_SOCK'):
    dbconfig['unix_socket'] = os.getenv('DB_SOCK')
else:
    dbconfig['host'] = os.getenv('DB_HOST') or 'localhost'
    dbconfig['port'] = os.getenv('DB_PORT') or '3306'

@app.route('/api/v1/hello')
def index():
    return jsonify({"message": "hello world!" })

app = DispatcherMiddleware(app, {
    '/api/v1/icfpc2019' : icfpc2019.app
})

if __name__ == "__main__":
    run_simple('localhost', 8088, app, use_debugger=True)

