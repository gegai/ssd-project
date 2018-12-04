__author__ = 'admin'
#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask
from werkzeug.wsgi import LimitedStream

from api.ssd.ssd import api_ssd_v1_bp, API_SSD_VERSION_V1
from api.clickbutton.ssd_hostinfo import api_hostinfo_v1_bp, API_HOSTINFO_VERSION_V1
from api.insertsql.insert_sql import api_insertsql_v1_bp,API_INSERTSQL_VERSION_V1
from api.excel_upload import API_UPLOAD_VERSION_V1,api_upload_v1_bp
from api.ssd_config.ssd_config import api_config_v1_bp,API_CONFIG_VERSION_V1
# from app.db.db import db

from config import config



# Fix for Connection Reset on POST
# http://flask.pocoo.org/snippets/47/
class StreamConsumingMiddleware(object):

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        stream = LimitedStream(environ['wsgi.input'],
                               int(environ['CONTENT_LENGTH'] or 0))
        environ['wsgi.input'] = stream
        app_iter = self.app(environ, start_response)
        try:
            stream.exhaust()
            for event in app_iter:
                yield event
        finally:
            if hasattr(app_iter, 'close'):
                app_iter.close()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app()
    # db.init_app(app)

    app.register_blueprint(
        api_ssd_v1_bp,
        url_prefix='{prefix}/v{version}'.format(
            prefix=app.config['URL_PREFIX'],
            version=API_SSD_VERSION_V1))

    app.register_blueprint(
        api_hostinfo_v1_bp,
        url_prefix='{prefix}/v{version}'.format(
            prefix=app.config['URL_PREFIX'],
            version=API_HOSTINFO_VERSION_V1))
    app.register_blueprint(
        api_insertsql_v1_bp,
        url_prefix='{prefix}/v{version}'.format(
            prefix=app.config['URL_PREFIX'],
            version=API_INSERTSQL_VERSION_V1))
    app.register_blueprint(
        api_upload_v1_bp,
        url_prefix='{prefix}/v{version}'.format(
            prefix=app.config['URL_PREFIX'],
            version=API_UPLOAD_VERSION_V1))

    app.register_blueprint(
        api_config_v1_bp,
        url_prefix='{prefix}/v{version}'.format(
            prefix=app.config['URL_PREFIX'],
            version=API_CONFIG_VERSION_V1))

    return app

