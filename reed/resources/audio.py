from flask import Flask, Response
from flask_restful import Resource




class Audio(Resource):

    def get(self):
        return {
            'hello': 'world'
        }
        pass

    def post(self):
        pass