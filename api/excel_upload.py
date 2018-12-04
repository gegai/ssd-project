#!/usr/bin/python
# encoding: utf-8
import flask_restful

from flask import Blueprint, jsonify, request,redirect,url_for
from flask import make_response
from app.model.insertsql.insert_app import Insert
from app.connectdatabase.excel.excel import operate_excel_group
from app.connectdatabase.excel.excel import operate_excel_sshgroup
from app.connectdatabase.excel.excel import operate_excel_host
from app.connectdatabase.excel.db import  ConnectDB
import flask, os,sys,time
from flask import request, send_from_directory
import os
from flask import Flask,render_template,send_from_directory
import time

UPLOAD_FOLDER='upload'
# app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER
basedir=os.path.abspath(os.path.dirname(__file__))
ALLOWER_EXTENSIONS=set(['txt','png','jpg','xls','JPG','PNG','xlsx','gif','GIF'])

API_UPLOAD_VERSION_V1 = 1
API_UPLOAD_VERSION = API_UPLOAD_VERSION_V1

api_upload_v1_bp = Blueprint('api_upload_v1', __name__)
api_upload_v1 = flask_restful.Api(api_upload_v1_bp)

# interface_path = os.path.dirname(__file__)
# sys.path.insert(0, interface_path)

class Quick_add_host(flask_restful.Resource):
    @staticmethod

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWER_EXTENSIONS

    def post(self):

        file_dir = os.path.join(basedir, UPLOAD_FOLDER)
        print file_dir
        if not os.path.exists(file_dir):
            os.makedirs(file_dir)
        f = request.files['myfile']
        allowed_file=Quick_add_host().allowed_file(f.filename)
        if f and allowed_file:
            fname = f.filename
            ext = fname.rsplit('.', 1)[1]
            print ext
            unix_time = int(time.time())
            new_filename = str(unix_time) + fname + '.' + ext
            print new_filename
            f.save(os.path.join(file_dir, new_filename))

            file={}
            file['status']=10000
            file['file_path']=file_dir+'/'+new_filename
            print type(file['file_path'])

            file_dir_str=str(file_dir)
            file_new_filename=str(new_filename)
            file_path=file_dir_str+'/'+file_new_filename

            group = operate_excel_group(file_path)
            ConnectDB().insert_group(group)

            sshgroup = operate_excel_sshgroup(file_path)
            ConnectDB().insert_sshgroup(sshgroup)

            host=operate_excel_host(file_path)
            ConnectDB().insert_host(host)

            # return redirect(url_for('index'))
            return file
        else:
            return jsonify({"errno": 10001, "errmsg": u"上传失败"})

api_upload_v1.add_resource(Quick_add_host, '/ssd/quick_add_host')
