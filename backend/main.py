from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/v1/hello')
def index():
    return jsonify({"message": "hello world!" })

if __name__ == "__main__":
    app.run(port=8088)

