from flask import Blueprint
from flask_restful import Api
from resources.audio import Audio

audio_bp = Blueprint('audio', __name__, url_prefix='/api/v1/audio')
audio_api = Api(audio_bp)


audio_api.add_resource(Audio, '/')