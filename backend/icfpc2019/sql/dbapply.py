
import sys, os
import glob
import mysql.connector as db
import json
from typing import List, Tuple
from collections import OrderedDict

DB_HOST = os.getenv('DB_HOST') or 'localhost'
DB_PORT = os.getenv('DB_PORT') or '3306'
DB_NAME = os.getenv('DB_NAME') or 'icfpc2019'
DB_USER = os.getenv('DB_USER') or  'negainoido'
DB_PASS = os.getenv('DB_PASS') or 'negainoido'

conn = db.connect(
    host=DB_HOST,
    port=DB_PORT,
    user=DB_USER,
    password=DB_PASS,
    database=DB_NAME,
    charset='utf8mb4',
    collation='utf8mb4_bin'
)

directories = ['create', 'data']

class ScriptInfo:
    id : str
    version : int
    release : int
    def __init__(self, id : str,  version : int, release : int):
        self.id = id
        self.version = version
        self.release = release


def apply_sql_file(dirname : str, script : str):
    with open(os.path.join(dirname, script), 'r') as f:
        cur = conn.cursor()
        try :
            cur.execute(f.read().replace('%', '%%'), multi=True)
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cur.close()

def get_current_version(script_id : str) -> Tuple[int, int]:
    cur = conn.cursor()
    try:
        cur.execute('''SELECT `version`, `release` FROM apply_history
                WHERE script_id = %s
                ORDER BY `version` DESC, `release` DESC
                LIMIT 1
        ''', (script_id,))
        row = cur.fetchone()
        if row:
            return (int(row[0]), int(row[1]))
        else:
            return (0,0)
    finally:
        cur.close()

def update_version(script_info : ScriptInfo):
    cur = conn.cursor()
    try:
        cur.execute('''INSERT INTO apply_history(`script_id`, `version`, `release`)
            values (%s, %s, %s)
        ''', (script_info.id, script_info.version, script_info.release))
        conn.commit()
    finally:
        cur.close()

# scriptの命名規則
# ${script_id}.${version:3d}.${release:2d}.sql
# version 1 -> version 2
#   script_id.002.00.sql
# version 2.0 ->  version 2.1
#   script_id.002.00.undo.sql
#   script_id.002.01.sql
def apply_script(dirname : str, script_id : str, scripts : List[ScriptInfo]):
    current_version, current_release = get_current_version(script_id)
    for script in scripts:
        version = script.version
        release =  script.release
        if version < current_version or (version == current_version and release == current_release):
            print('Skiped', script_id, version, release)
            continue
        if version == current_version:
            undo_script = '{}.{:03d}.{:02d}.undo.sql'.format(script_id, current_version, current_release)
            print('Applied', undo_script)
            apply_sql_file(dirname, undo_script)
        script_name = '{}.{:03d}.{:02d}.sql'.format(script_id, version, release)
        print('Applied', script_name)
        apply_sql_file(dirname, script_name)
        update_version(script)

def parse_versions(dirname : str) -> List[Tuple[str, List[ScriptInfo]]]:
    decoder = json.JSONDecoder(object_pairs_hook=OrderedDict)
    with open(os.path.join(dirname, "versions.json"), 'r') as f:
        result: List[Tuple[str, List[ScriptInfo]]] = []
        for script_id, versions in decoder.decode(f.read()).items():
            result.append((script_id, [
                ScriptInfo(script_id, v["version"], v["release"])
                    for v in versions
            ]))
        return result

def apply_scripts(dirname : str):
    versions = parse_versions(dirname)
    for script_id, scripts in versions:
        apply_script(dirname, script_id, scripts)

if __name__ == '__main__':
    for dirname in directories:
        apply_scripts(dirname)