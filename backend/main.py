from flask import Flask, jsonify
from fastapi import FastAPI
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
import icfpc2019.app as icfpc2019


import os

app = FastAPI()



@app.get('/api/v1/hello')
async def index():
    return {"message": "hello world!" }

# app = DispatcherMiddleware(app, {
#     '/api/v1/icfpc2019' : icfpc2019.app
# })


