import os

import mysql.connector as db
from fastapi import APIRouter, Response

dbconfig = {
    "database": os.getenv("DB_NAME") or "icfpc2019",
    "user": os.getenv("DB_USER") or "negainoido",
    "password": os.getenv("DB_PASS") or "negainoido",
    "charset": "utf8mb4",
    "collation": "utf8mb4_bin",
    "pool_name": "pool-icfpc2019",
}

if os.getenv("PRODUCTION"):
    dbconfig["unix_socket"] = "/cloudsql/" + os.getenv("DB_SOCK")
else:
    dbconfig["host"] = os.getenv("DB_HOST") or "localhost"
    dbconfig["port"] = os.getenv("DB_PORT") or "3306"

router = APIRouter()


@router.get("/")
async def index():
    return {"message": "hello world icfpc2019"}


def get_problem_count(cur):
    query = """
        SELECT COUNT(*) FROM problem
    """
    cur.execute(query)
    row = cur.fetchone()
    return row[0]


@router.get("/problems")
async def problems(response: Response, page: int = 1):
    conn = db.connect(**dbconfig)
    page_size = 20
    page_offset = max(0, (page - 1) * page_size)
    try:
        cur = conn.cursor()
        try:
            query = """
                SELECT `name`, `description`, `url` FROM problem
                ORDER BY `name` ASC
                LIMIT {} OFFSET {}
            """.format(
                page_size, page_offset
            )
            cur.execute(query)
            result = []
            for row in cur.fetchall():
                obj = {}
                obj["name"] = row[0]
                obj["description"] = row[1]
                obj["url"] = row[2]
                result.append(obj)
            response.headers["X-Page-Size"] = str(20)
            response.headers["X-Page"] = str(page)
            response.headers["X-Total"] = str(get_problem_count(cur))
            return result
        finally:
            cur.close()
    finally:
        conn.close()
