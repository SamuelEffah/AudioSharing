from flask  import Flask 
import flask_restful
from blueprints.audio_blueprint import audio_api, audio_bp




def create_app(environment = None):
    app = Flask(__name__)

    app.register_blueprint(audio_bp)

    return app


app = create_app()

if __name__ == '__main__':
    app.run()