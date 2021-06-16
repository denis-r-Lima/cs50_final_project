from sqlite3.dbapi2 import IntegrityError
from flask import Flask, request, make_response, session, redirect
from flask_session import Session
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
import jwt
import datetime
import sys
import os

from databaseConnection import SQL
from helpers import login_required


app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
app.config["CORS_SUPPORTS_CREDENTIALS"] = True
Session(app)
CORS(app, origins=["http://localhost:3000"],
     methods=["GET", "POST"], supports_credentials=True)


db = SQL()

db.connect('./database/booker.db')


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
def index():
    resp = make_response({"code": 200})
    resp.set_cookie("token", generate_password_hash("12345"))
    return resp


@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    try:
        user = db.execute(
            'SELECT * FROM users WHERE email=:email', {"email": email})

        if not user:
            return make_response({"message": "Wrong username or password"}, 403)

        if not check_password_hash(user[0]["password"], password):
            return make_response({"message": "Wrong username or password"}, 403)

        token = jwt.encode({'user_id': user[0]['id'], 'exp':  datetime.datetime.utcnow(
        ) + datetime.timedelta(hours=24)}, os.environ['SECRET_KEY'])

        response = make_response({'message': 'Success'}, 200)

        expireDate = datetime.datetime.utcnow() + datetime.timedelta(hours=24)

        response.set_cookie('auth_token', token.decode(
            'UTF-8'), expires=expireDate, samesite="strict")

        return response

    except:
        print(sys.exc_info())
        return make_response({"message": "Server error"}, 500)


@app.route("/register", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    email = request.form.get("email")
    confirmation = request.form.get("confirmation")
    pageName = request.form.get("pageName")


    if password != confirmation:
        resp = make_response(
            {"Message": "Password and confirmation does not match"}, 400)
        return resp

    passHash = generate_password_hash(password)

    try:
        id = db.execute(
            'INSERT INTO users (name, email, password) VALUES (? , ?, ?)', (username, email, passHash))

        try:
            db.execute(
                'INSERT INTO pages (user_id, page_name) VALUES (?, ?)', (id, pageName.lower()))

        except IntegrityError:

            db.execute('DELETE FROM users WHERE id=:id', {"id": id})

            return make_response({"message": "Page name already exist, please choose another!"}, 409)

        except:
            db.execute('DELETE FROM users WHERE id=:id', {"id": id})

            return make_response({"message": "It was not possible to complete the request, try again later"}, 500)

    except IntegrityError:
        return make_response({"message": "Username or email already registered"}, 409)
    except:
        return make_response({"message": "It was not possible to complete the request, try again later"}, 500)

    return make_response({"message": "User created successfully"}, 200)


@app.route("/personalpage", methods=["POST"])
def personalPage():

    page = request.form.get("page")

    try:
        page_result = db.execute(
            'SELECT user_id FROM pages WHERE page_name=:page', {"page": page.lower()})


        if len(page_result) < 1:
            return make_response({"message": "Page not found!"}, 404)

        appointments = db.execute("SELECT client, phone, date FROM appointments WHERE user_id=:id", {"id": page_result[0]['user_id']})

        return {"appointments": appointments, "user_id": page_result[0]['user_id']}
    except:
        print(sys.exc_info())
        return make_response({"message": "Page not found!"}, 404)


@app.route("/check_auth")
def check_auth():
    REDIRECT_URL = 'http://localhost:3000/login'

    token = request.cookies.get('auth_token')

    if not token:
        return make_response({"Message": "You don't have authorization to access"}, 401)

    try:
        payload = jwt.decode(token, os.environ['SECRET_KEY'])
        user_id = payload['user_id']

        username = db.execute(
            'SELECT name, id, page_name FROM users JOIN pages ON users.id = pages.user_id WHERE id=:id', {'id': user_id})

        if not username:
            return make_response({"Message": "You don't have authorization to access"}, 401)

        return username[0]

    except:
        print(sys.exc_info())
        return make_response({"Message": "You don't have authorization to access"}, 401)


@app.route("/schedule")
def schedule():

    user_id = request.args.get('user_id')

    print(user_id)

    if user_id:

        try:
            data = db.execute(
                "SELECT * FROM appointments WHERE user_id=:id AND date>date('now', '-1 days')", {"id": user_id})

            if not data:
                data = []
            return {"schedule": data}

        except:
            print(sys.exc_info())
            return {"schedule": []}


    return {"schedule": []}


@app.route("/make_appointment", methods=["POST"])
def make_appointment():

    client = request.form.get("client")
    phone = request.form.get("phone")
    year = int(request.form.get("year"))
    month = int(request.form.get("month")) + 1
    day = int(request.form.get("day"))
    hour = int(request.form.get("hour"))
    minute = int(request.form.get("minute"))
    user_id = request.form.get("user_id")


    date = datetime.datetime(year=year, month=month, day=day, hour=hour, minute=minute)

    try:
        db.execute("INSERT INTO appointments (user_id, client, phone, date) VALUES (?, ?, ?, ?)", [user_id, client, phone, date])
        return {"message": "Your appointment was successfully made"}
    except:
        print(sys.exc_info())
        return make_response({ "message" : 'It was not possible to complete your request'}, 422)




@app.route("/users")
def users():

    users = db.execute("SELECT * FROM users")
    return {"users": users}


@app.route("/pages")
def pages():

    pages = db.execute("SELECT * FROM pages")
    return {"pages": pages}


@app.route("/appointments")
def appointments():

    appointments = db.execute("SELECT * FROM appointments")
    return {"appointments": appointments}


def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return make_response({"error": e.name}, e.code)


for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
