from sqlite3.dbapi2 import IntegrityError
import sys
from flask import Flask, request, make_response, session
from flask_session import Session
from flask_cors import CORS
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from databaseConnection import SQL



app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
Session(app)
CORS(app)


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
    resp = make_response({ "code": 200})
    resp.set_cookie("token", generate_password_hash("12345") )
    return resp


@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    try:
        user = db.execute('SELECT * FROM users WHERE username=:name', {"name": username})

        if not user:
            return make_response({"message": "Wrong username or password"}, 403)


        if not check_password_hash(user[0]["password"], password):
            return make_response({"message": "Wrong username or password"}, 403)

    except:
        return make_response({"message": "Server error"}, 500)

    return { "code": 200, "message": "ok" }


@app.route("/register", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    email = request.form.get("email")
    confirmation = request.form.get("confirmation")
    pageName = request.form.get("pageName")

    if password != confirmation:
        resp = make_response({ "Message": "Password and confirmation does not match"}, 400)
        return resp

    passHash = generate_password_hash(password)


    try:
        id = db.execute('INSERT INTO users (username, email, password) VALUES (? , ?, ?)', (username, email, passHash))

        try:
            db.execute('INSERT INTO pages (user_id, page_name) VALUES (?, ?)', (id, pageName))

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
        page_result = db.execute('SELECT user_id FROM pages WHERE page_name=:page', {"page": page})
        
        if len(page_result) < 1:
            return make_response({ "message": "Page not found!" }, 404)

        return {"page": page_result[0]}
    except:
        return make_response({ "message": "Page not found!" }, 404)


@app.route("/users", methods=["GET"])
def users():

    users = db.execute("SELECT * FROM users")
    return {"users":users}

@app.route("/pages", methods=["GET"])
def pages():

    pages = db.execute("SELECT * FROM pages")
    return {"pages":pages}


def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return { "code": e.code, "error": e.name }


for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
