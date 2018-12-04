__author__ = 'admin'
#!/usr/bin/python
# -*- coding: utf-8 -*-



import os
from os import path

import psycopg2

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    PORT = 5000
    HOST = '0.0.0.0'
    URL_PREFIX = '/api'

    # PROJECT_ROOT = path.abspath(path.dirname(__file__))
    # TEMPLATE_FOLDER = path.join(PROJECT_ROOT, 'modell')
    # SECRET_KEY = 'TRAVELDATA'
    # SESSION_EXP_TIME = 1800
    CONFIGURE_DICT = {}


    SSD_DATABASE_NAME = "ssd"
    SSD_DATABASE_USERNAME = "ssd"
    SSD_DATABASE_PASSWORD = "ssd"
    SSD_DATABASE_IP = "127.0.0.1"
    SSD_DATABASE_PORT = 5432 

    # dbInfo ={
    # "host": '10.10.10.199',
    # "user": 'ssd',
    # "passwd": 'ssd',
    # "db": 'ssd',
    # "port": 5444,
    # "charset": 'utf8'}





    @staticmethod
    def init_app():
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://%s:%s@%s:%d/%s" % (
        Config.SSD_DATABASE_USERNAME, Config.SSD_DATABASE_PASSWORD, Config.SSD_DATABASE_IP, Config.SSD_DATABASE_PORT, Config.SSD_DATABASE_NAME)
    # SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:111111@localhost:5432/travelData"


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://%s:%s@%s:%d/%s" % (
        Config.SSD_DATABASE_USERNAME, Config.SSD_DATABASE_PASSWORD, Config.SSD_DATABASE_IP, Config.SSD_DATABASE_PORT, Config.SSD_DATABASE_NAME)
    # SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:111111@localhost:5432/travelData"


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://%s:%s@%s:%d/%s" % (
        Config.SSD_DATABASE_USERNAME, Config.SSD_DATABASE_PASSWORD, Config.SSD_DATABASE_IP, Config.SSD_DATABASE_PORT, Config.SSD_DATABASE_NAME)
    # SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:111111@localhost:5432/travelData"


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': ProductionConfig
}

