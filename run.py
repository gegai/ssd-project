#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
#import sys
from operator import and_

from flask import request, jsonify, g, current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.connectdatabase.postgre import ConnectDB
import time
# from apii.constant.Constant import Constant
from app import create_app
# from app.modell.configure.configure_model import ConfigureModel
# from app.modell.user.user_model import Users
import flask, os,sys,time
from flask import request, send_from_directory
from flask import make_response

interface_path = os.path.dirname(__file__)
sys.path.insert(0, interface_path)

# 重设系统默认编码为utf-8
# reload(sys)
# sys.setdefaultencoding('utf-8')

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

@app.errorhandler(404)
def page_not_found(error):
    print error
    return jsonify({'status':'404', 'msg': u'页面被狗叼走了！'})

# @app.route('/api/v1/upload', methods=['post'])
# def upload():
#     fname = request.files.get('file')
#     print fname
#     ret_json={}
#     if fname:
#         t = time.strftime('%Y%m%d%H%M%S')
#         new_fname = r'upload/' + t + fname.filename
#         fname.save(new_fname)
#         return '{"code": "ok"}'
#     else:
#         return '{"msg": "file!"}'
    # rst = make_response(ret_json)
    # rst.headers['Access-Control-Allow-Origin'] = '*'
    # return rst




if __name__ == "__main__":
    # ConnectDB().monitor_to_db()
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=True)





