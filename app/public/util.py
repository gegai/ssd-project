#!/usr/bin/python
# -*- coding: utf-8 -*-

# '''
#     utils.py
#     ~~~~~~~~~~~~~~~~~~~~~~~
#     定义项目全局公共的函数、类、对象和常量等
#
#     @author: maran
#     @version: 1
#
# '''

def unicode_to_object(unicode_):
    """将前端传递过来的json对象unicode字符转换成对象，如果不存在，则返回None
    :param unicode_: unicode字符
    :return object
    """
    if unicode_ and isinstance(unicode_, unicode):
        unicode_ = unicode_.replace(':true', ':True')
        unicode_ = unicode_.replace(':false', ':False')
        unicode_ = unicode_.replace(':null', ':None')
        return eval(unicode_)             #eval函数就是实现list、dict、tuple与str之间的转化

