from flask import Flask, jsonify
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
import icfpc2019.app as icfpc2019


import os

app = Flask(__name__)



@app.route('/api/v1/hello')
def index():
    return jsonify({"message": "hello world!" })

app = DispatcherMiddleware(app, {
    '/api/v1/icfpc2019' : icfpc2019.app
})

if __name__ == "__main__":
    run_simple('localhost', 8088, app, use_debugger=True)

