from flask import Flask, request, make_response, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError


app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
Session(app)

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

    return { "code": 200, "message": "ok" }


@app.route("/register", methods=["POST"])
def register():


    return { "message": "You are registered!" }


def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return { "code": e.code, "error": e.name }


for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
