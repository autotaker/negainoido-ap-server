from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import icfpc2019.app as icfpc2019


import os

app = FastAPI()

@app.get('/api/v1/hello')
async def index():
    return {"message": "hello world!" }

app.include_router(icfpc2019.router, 
    prefix = '/api/v1/icfpc2019', 
    tags = ['icfpc2019'])

if not os.getenv('PRODUCTION'):
    app.add_middleware(
        CORSMiddleware,
        allow_origins = ['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


