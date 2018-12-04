#!/usr/bin/python
# encoding: utf-8
import flask_restful

from flask import Blueprint, jsonify, request
from flask import make_response
from app.model.insertsql.insert_app import Insert

import flask, os,sys,time
from flask import request, send_from_directory
import os

basedir=os.path.abspath(os.path.dirname(__file__))
ALLOWER_EXTENSIONS=set(['txt','png','jpg','xls','JPG','PNG','xlsx','gif','GIF'])

API_INSERTSQL_VERSION_V1 = 1
API_INSERTSQL_VERSION = API_INSERTSQL_VERSION_V1

api_insertsql_v1_bp = Blueprint('api_insertsql_v1', __name__)
api_insertsql_v1 = flask_restful.Api(api_insertsql_v1_bp)

interface_path = os.path.dirname(__file__)
sys.path.insert(0, interface_path)  #将当前文件的父目录加入临时系统变量

class insert_host(flask_restful.Resource):
    @staticmethod
    def post():
        option1 =request.get_json('hostinfo')
        print option1

        result = Insert().add_host(option1['hostname'],option1['ip'],option1['mask'],option1['username'],option1['password'],option1['port'],option1['group_id'],option1['sshgroup_id'])
        # rst = make_response(jsonify(result))
        return result

api_insertsql_v1.add_resource(insert_host, '/ssd/insert_host')

class create_group(flask_restful.Resource):
    @staticmethod
    def post():
        option1 = request.get_json('group_name')
        print option1
        group_name=option1['group_name']
        # group_tuple=(""+group_name+"",)

        result = Insert().insert_group(group_name)

        return result

api_insertsql_v1.add_resource(create_group, '/ssd/create_group')

class delete_group(flask_restful.Resource):
    @staticmethod
    def post():
        option1 = request.get_json('id_list')
        print option1
        # group_id=str(option1['id_list'])
        id_list=[]
        for item in option1['id_list']:
            id_str=str(item['id'])

            # print id_str
            # id_tuple=(""+id_str+"",)
            id_list.append(id_str)

        result = Insert().drop_group(id_list)

        return result

api_insertsql_v1.add_resource(delete_group, '/ssd/delete_group')









