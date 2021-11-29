from os import environ
from app import create_app,socketio

app = create_app(environ.get('FLASK_ENV'))



if __name__ == "__main__":
    print(environ.get('FLASK_ENV'))
    socketio.run(app)