
from flask_socketio import emit
from app import socketio



@socketio.on("ping")
def handle_ping():
    print("ping")
    emit("pong")


@socketio.on("connect")
def connect():
    print("Connected...")

def uploading_status(status):
    emit()
