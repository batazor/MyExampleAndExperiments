from flask import Flask
from flask_restful import Resource, Api
import phorbet

def HTTP_ROUTER():
    app = Flask(__name__)
    api = Api(app)

    class HelloWorld(Resource):
        def get(self):
            test = phorbet.hello()
            return test

    api.add_resource(HelloWorld, '/')
    return app
