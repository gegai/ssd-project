#!/usr/bin/python
# -*- coding: utf-8 -*-
import flask_restful

from flask import Blueprint, jsonify, request
from flask import make_response

# from app.model.ssditem.ssditem_app import SSD
from app.model.initgroup_app.initgroup_app import SSDItem
from app.model.clickbutton.clickbutton_app import Click

API_SSD_VERSION_V1 = 1
API_SSD_VERSION = API_SSD_VERSION_V1

api_ssd_v1_bp = Blueprint('api_ssd_v1', __name__)
api_ssd_v1 = flask_restful.Api(api_ssd_v1_bp)

# class ssd_listApi(flask_restful.Resource):
#      @staticmethod
#      def post():
#
#         result =SSD().Cmd()
#         rst = make_response(jsonify(result))
#         rst.headers['Access-Control-Allow-Origin'] = '*'
#
#         return rst
#
#
# api_ssd_v1.add_resource(ssd_listApi, '/ssd/ssd')

class ssd_init(flask_restful.Resource):

    @staticmethod
    def post():

        result = SSDItem().initgroup()

        return result
api_ssd_v1.add_resource(ssd_init, '/ssd/initgroup')

class sshssd_init(flask_restful.Resource):

    @staticmethod
    def post():

        result = SSDItem().sshgroup()

        return result
api_ssd_v1.add_resource(sshssd_init, '/ssd/sshgroup')


'''
初始化第一个IP信息
'''
class ssd_ipinit(flask_restful.Resource):

    @staticmethod
    def post():

        option1 = request.get_json("id")
        id=option1['id']
        id_str=str(id)

        # id_tuple=(""+id_str+"",)
        # print id_tuple
        result = SSDItem().initipinfo(id_str)

        return result
api_ssd_v1.add_resource(ssd_ipinit, '/ssd/init_ipinfo')



class ssd_hostinfo(flask_restful.Resource):

    @staticmethod
    def post():

        option1 = request.get_json("id")
        id=option1['id']
        id_str=str(id)
        print option1
        # id_tuple=(""+id_str+"",)
        result = Click().host_baseinfo(id_str)

        return result
api_ssd_v1.add_resource(ssd_hostinfo, '/ssd/hostinfo')





