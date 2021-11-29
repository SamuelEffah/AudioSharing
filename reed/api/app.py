from flask  import Flask 
import flask_restful
import os
from flask_socketio import SocketIO
from blueprints.audio_blueprint import audio_bp, audio_api
from flask_cors import CORS


socketio = SocketIO()
cors = CORS()
def create_app(environment = None):
    app = Flask(__name__)
    app.secret_key = 'dzDFH65fsadfa3453'
    cors.init_app(app)
    if app.config['ENV'] == 'production':
        app.config.from_object('config.Production')
    elif app.config['ENV'] == 'development':
        app.config.from_object('config.Development')
    elif app.config['ENV'] == 'testing':
        app.config.from_object('config.Testing')
    
    

    
    # if not environment:
    #     environment = os.environ.get('FLASK_CONFIG', 'development')
    # app.config.from_object('config.{}'.format(environment.capitalize()))
    app.register_blueprint(audio_bp)

    from blueprints.socket_blueprint import main as main_blueprint
    app.register_blueprint(main_blueprint)
    socketio.init_app(app)
    return app



