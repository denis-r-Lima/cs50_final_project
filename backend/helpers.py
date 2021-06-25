from functools import wraps
from flask import redirect, request
import jwt
import os
import sys
from databaseConnection import SQL

db = SQL()

db.connect('./database/booker.db')


def login_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):
        REDIRECT_URL = 'http://localhost:3000/login'

        token = request.cookies.get('auth_token')

        if not token:
            return redirect(REDIRECT_URL)

        try:
            payload = jwt.decode(token, os.environ['SECRET_KEY'])

            user_id = payload['user_id']

            user = db.execute(
                'SELECT name FROM users WHERE id=:id', {'id': user_id})

            if not user:
                return redirect(REDIRECT_URL)

            return f(*args, **kwargs)

        except:
            print(sys.exc_info())
            return redirect(REDIRECT_URL)

    return decorated_function
