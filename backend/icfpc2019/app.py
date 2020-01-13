from flask import Flask, jsonify, request
import os
import mysql.connector as db

dbconfig = {
    "database": os.getenv('DB_NAME') or 'icfpc2019',
    "user": os.getenv('DB_USER') or 'negainoido',
    "password": os.getenv('DB_PASS') or 'negainoido',
    "charset": 'utf8mb4',
    "collation": 'utf8mb4_bin',
    "pool_name": 'pool-icfpc2019'
}

if os.getenv('PRODUCTION'):
    dbconfig['unix_socket'] = '/cloudsql/negainoido-icfpc-platform:asia-northeast1:mysql-negainoido'
else:
    dbconfig['host'] = os.getenv('DB_HOST') or 'localhost'
    dbconfig['port'] = os.getenv('DB_PORT') or '3306'

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({"message": "hello world icfpc2019"})

def get_problem_count(cur):
    query = '''
        SELECT COUNT(*) FROM problem
    '''
    cur.execute(query)
    row = cur.fetchone()
    return row[0]

def get_page():
    pageParam = request.args.get('page')
    if pageParam:
        return int(pageParam)
    else:
        return 1

@app.route('/problems')
def problems():
    conn = db.connect(**dbconfig)
    page = get_page()
    page_size = 20
    page_offset = (page - 1) * page_size
    try:
        cur = conn.cursor()
        try: 
            query = '''
                SELECT `name`, `description`, `url` FROM problem
                ORDER BY `name` ASC
                LIMIT {} OFFSET {}
            '''.format(page_size, page_offset)
            cur.execute(query)
            result = []
            for row in cur.fetchall():
                obj = {}
                obj["name"] = row[0]
                obj["description"] = row[1]
                obj["url"] = row[2]
                result.append(obj)
            response = jsonify(result)
            response.headers['X-Page-Size'] = 20
            response.headers['X-Page'] = page
            response.headers['X-Total'] = get_problem_count(cur) 
            return response
        finally:
            cur.close()
    finally:
        conn.close()