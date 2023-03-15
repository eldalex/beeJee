from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from fake_db import Database
from functools import wraps
import datetime

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
to_do_list_data = Database()

AUTH_USERNAME = 'admin'
AUTH_PASSWORD = '123'


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return unauthorized()
        return f(*args, **kwargs)

    return decorated


@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the public page'})


@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(to_do_list_data.get_tasks_list())


@app.route('/todos', methods=['POST'])
def add_todo():
    new_task = request.json
    new_task.update({"done": "False"})
    to_do_list_data.add_to_do_task(new_task)
    return []


@app.route('/todos', methods=['PUT'])
@requires_auth
def edit_todo_task():
    to_do_list_data.edit_task(request.json)
    return []


@app.route('/toggletodo', methods=['PUT'])
@requires_auth
def toggle_todo_task():
    to_do_list_data.toggle_task_status(request.json['id'])
    return []


@app.route('/todos/<id>', methods=["DELETE"])
@requires_auth
def delete_todo_task(id):
    to_do_list_data.delete_to_do_task(id)
    return "Success"


def check_auth(username, password):
    return username == AUTH_USERNAME and password == AUTH_PASSWORD


def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)


@app.route('/protected')
@requires_auth
def protected():
    return jsonify({'result': 'Success'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
