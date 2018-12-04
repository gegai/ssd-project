__author__ = 'admin'

#!/usr/bin/python

# encoding: utf-8

import flask_restful
import  time

from flask import Blueprint, jsonify, request

from app.model.config_app.config_app import Config
from app.connectdatabase.sshgroup.sshgroup import SSHgroup
from app.connectdatabase.postgre import ConnectDB

API_CONFIG_VERSION_V1 = 1

API_CONFIG_VERSION = API_CONFIG_VERSION_V1

api_config_v1_bp = Blueprint('api_config_v1', __name__)

api_config_v1 = flask_restful.Api(api_config_v1_bp)

class select_config(flask_restful.Resource):

    @staticmethod

    def post():

        result = Config().select_config()

        return result

api_config_v1.add_resource(select_config, '/ssd/select_config')

class select_apptime(flask_restful.Resource):

    @staticmethod

    def post():

        result = Config().select_apptime()

        return result

api_config_v1.add_resource(select_apptime, '/ssd/select_apptime')


class change_config(flask_restful.Resource):

    @staticmethod

    def post():

        option1 =request.get_json("config")

        id=option1['id']

        id_str=str(id)

        # id_tuple=(""+id_str+"",)

        warning = option1['warning']

        warning_str = str(warning)

        # warning_tuple = ("" + warning_str + "",)

        danger = option1['danger']

        danger_str = str(danger)

        # danger_tuple = ("" + danger_str + "",)

        result = Config().change_config(id_str, warning_str,danger_str)

        return result



api_config_v1.add_resource(change_config, '/ssd/change_config')


class change_apptime(flask_restful.Resource):

    @staticmethod

    def post():

        option1 =request.get_json("config")
        id = option1['id']

        id_str = str(id)

        # id_tuple = ("" + id_str + "",)

        hour=option1['hour']

        hour_str=str(hour)

        # hour_tuple=(""+hour_str+"",)

        minute = option1['minute']

        minute_str = str(minute)

        # minute_tuple = ("" + minute_str + "",)

        second = option1['second']

        second_str = str(second)

        config_time = option1['config_time']

        config_time_str = str(config_time)

        # second_tuple = ("" + second_str + "",)

        result = Config().change_apptime( id_str,hour_str,minute_str,second_str,config_time_str)

        return result

api_config_v1.add_resource(change_apptime, '/ssd/change_apptime')

class select_number_to_db(flask_restful.Resource):

    @staticmethod

    def post():

        print time.time(),'do sth'

        result = SSHgroup().execute_ssh_host()

        return result

api_config_v1.add_resource(select_number_to_db, '/ssd/select_number_to_db')

class db_operate(flask_restful.Resource):

    @staticmethod

    def post():
        # ConnectDB().cardinfo_to_db()
        # ConnectDB().olddata_to_archwarn()
        result=ConnectDB().monitor_operate()

        return result

api_config_v1.add_resource(db_operate, '/ssd/db_operate')









