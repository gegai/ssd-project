#!/usr/bin/python
# -*- coding: utf-8 -*-

#常量定义

class Constant(object):

    SUCCESS_CODE = 10000
    SUCCESS_MSG = u'操作成功！'

    ERROR_CODE = 10001
    ERROR_MSG = u'操作失败！'

    ERROR_Already_CODE = 10005
    ERROR_Already_MSG = u'主机已存在，无法添加！'

    ERROR_Hostsave_CODE = 10006
    ERROR_Hostsave_MSG = u'主机存入数据库失败！'

    INSERT_SUCCESS_CODE = 10000
    INSERT_SUCCESS_MSG = u'插入成功！'

    INSERT_ERROR_CODE = 10001
    INSERT_ERROR_MSG = u'插入失败！'

    DELETE_SUCCESS_CODE=10000
    DELETE_SUCCESS_MSG=u'删除成功！'

    DELETE_ERROR_CODE=10001
    DELETE_ERROR_MSG=u'删除失败！'

    DELETE_NOTEXIT_CODE=10002
    DELETE_NOTEXIT_MSG=u'分组不存在！'

    DB_INSERT_SECCESS_CODE = 10000
    DB_INSERT_SECCESS_MSG = 'insert successful!'

    DB_INSERT_ERROR_CODE = 10004
    DB_INSERT_ERROR_MSG = 'insert failure!'



