from flask import session
from flask_socketio import emit
from app import socketio
import boto3




@socketio.on("ping")
def handle_ping():
    print("ping")
    emit("pong")


@socketio.on("connect")
def connect():
    print("Connected...")

def uploading_status(status):
    emit()



@socketio.on("play_audio")
def play_audio(data):
    pass 



def download_audio(object_name):
    bucket="podcastcapstone"
    s3 = boto3.client('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
     aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    s3.download_file(bucket, object_name, './audio')
 