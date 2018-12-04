# encoding: utf-8

from app.model.initgroup_app.initgroup_app import SSDItem
from api.constant.Constant import Constant

class Config(object):
    '''查询配置'''
    def select_config(self):
        ret_json = {'status': Constant.SUCCESS_CODE}

        try:

            select1 = "select * from ssd_threshold where id<7;"

            result = SSDItem().operate_db_select(select1)

            # ret_json['data']=result['res']

            config_list = []

            for item in result['res']:

                config_dict={}
                config_dict['id'] = item[0]

                config_dict['monitoritem'] = item[1]
                config_dict['threshold'] = item[2]
                config_dict['description'] = item[3]
                config_dict['monitor_zh'] = item[4].replace(' ', '')

                config_dict['warning'] = item[5].replace(' ', '')

                config_dict['danger'] = item[6].replace(' ', '')

                config_list.append(config_dict)

            ret_json['data'] =config_list

        except Exception, e:

            print "error %s" % str(e)

            ret_json['status'] = Constant.ERROR_CODE

            ret_json['msg'] = e.message
        print ret_json

        return ret_json

    '''获取后台轮询时间'''

    def select_apptime(self):
        ret_json = {'status': Constant.SUCCESS_CODE}

        try:

            select1 = "select * from ssd_config_time where app_time_hour is not null;"

            result = SSDItem().operate_db_select(select1)

            # ret_json['data']=result['res']

            config_apptime_list = []

            for item in result['res']:
                config_dict = {}
                config_dict['id'] = item[0]

                config_dict['config_time'] = item[1]
                config_dict['app_time_hour'] = item[2]
                config_dict['app_time_minute'] = item[3]
                config_dict['app_time_second'] = item[4]

                config_apptime_list.append(config_dict)

            ret_json['data'] = config_apptime_list

        except Exception, e:

            print "error %s" % str(e)

            ret_json['status'] = Constant.ERROR_CODE

            ret_json['msg'] = e.message
        print ret_json

        return ret_json

    '''修改配置'''
    def change_config(self,id,warning,danger):
        ret_json = {'status': Constant.SUCCESS_CODE}
        print id,warning,danger

        try:

            select1 = "update ssd_threshold set warning = '%s' where id=%d;" %(warning,int(id))
            select2 = "update ssd_threshold set danger= '%s' where id=%d;"%(danger,int(id))


            # result=SSDItem().executesql('two', select1, warning,id)
            result1=SSDItem().operate_db_not_select(select1)
            if result1['status']!=10000:
                ret_json['status'] = Constant.ERROR_CODE

            result=SSDItem().operate_db_not_select(select2)
            if result['status'] != 10000:
                ret_json['status'] = Constant.ERROR_CODE


        except Exception, e:

            print "error %s" % str(e)

            ret_json['status'] = Constant.ERROR_CODE

            ret_json['msg'] = e.message
        print ret_json

        return ret_json

    '''修改轮询时间'''
    def change_apptime(self,id,hour,minute,second,config_time):
        ret_json = {'status': Constant.SUCCESS_CODE}

        try:

            select1 = "update ssd_config_time set app_time_hour='%s' ,app_time_minute='%s',app_time_second='%s',config_time='%s' where id=%d;"%(hour,minute,second,config_time,int(id))

            result=SSDItem().operate_db_not_select(select1)
            if result['status']!=10000:
                ret_json['status'] = Constant.ERROR_CODE

        except Exception, e:

            print "error %s" % str(e)

            ret_json['status'] = Constant.ERROR_CODE

            ret_json['msg'] = e.message
        print ret_json

        return ret_json






# result=Config().select_config()
# result1=Config().change_apptime(('50278',),('0',),('0',),('2',))
# result1=Config().change_config(("1",),("90",),("100",))

