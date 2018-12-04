# encoding: utf-8from api.constant.Constant import Constantfrom app.model.initgroup_app.initgroup_app import SSDItemfrom app.config import Config# from app.connectdatabase.postgre import ConnectDBimport psycopg2class Click(object):    '''分组IP列表'''    def group_host_info(self,group_id):        print group_id        ret_json = {'status': Constant.SUCCESS_CODE}        try:            select1="select a.id,a.ip,a.hostname from ssd_host a LEFT OUTER JOIN ssd_group b on a.group_id=b.group_id where b.group_id=%d;" %(int(group_id))            result=SSDItem().operate_db_select(select1)            print result            ip_list=[]            for item in result['res']:                ip_dict={}                ip_dict['id']=item[0]                ip_dict['ip']=item[1]                if item[2] is not None:                    ip_dict['hostname']=item[2].replace(' ', '')                else:                    ip_dict['hostname'] = item[2]                ip_list.append(ip_dict)            ret_json['data']=ip_list        except Exception, e:            print "error %s" % str(e)            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = e.message        return ret_json    '''    某个IP的基本信息    '''    def host_baseinfo(self,id):        ret_json = {'status': Constant.SUCCESS_CODE}        try:            select1="select ip,cardinfo,hostname from ssd_host where id=%d" % (int(id))            # count="select count(*) from ssd_warning where warn_ip=(select ip from ssd_host where id=%s);" %(int(id))            count="select count(*) from ssd_monitor where state <> 'normal' and host_id=%d;" %(int(id))            result=SSDItem().operate_db_select(select1)            if result['status']!=10000:                ret_json['status'] = Constant.ERROR_CODE            result3=SSDItem().operate_db_select(count)            if result3['status']!=10000:                ret_json['status'] = Constant.ERROR_CODE            ret_json['error_num']=result3['res'][0][0]            ret_json['ip']=result['res'][0][0]            ret_json['cardinfo']=result['res'][0][1]            if result['res'][0][2]:                ret_json['hostname']=result['res'][0][2].replace(' ','')            else:                ret_json['hostname'] = result['res'][0][2]        except Exception, e:            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = Constant.ERROR_MSG            print "error %s" % str(e)        print ret_json        return ret_json    '''    某个IP的监控信息    '''    def host_monitorinfo(self,id):        ret_json = {'status': Constant.SUCCESS_CODE}        try:            select2="select ip from ssd_host where id=%d;" %(int(id))            select1="select b.threshold,a.monitoritem,a.state,a.value,a.card,a.monitor_time from ssd_monitor a LEFT OUTER JOIN ssd_threshold b on a.monitoritem=b.monitoritem where (a.host_id,a.monitoritem,a.monitor_time) in (select host_id,monitoritem,max(monitor_time) from ssd_monitor group by host_id,monitoritem,card) and a.host_id=%d;" %(int(id))            result1 = SSDItem().operate_db_select(select2)            if result1['status'] != 10000:                ret_json['status'] = Constant.ERROR_CODE            result = SSDItem().operate_db_select(select1)            if result['status'] != 10000:                ret_json['status'] = Constant.ERROR_CODE            ret_json['ip']=result1['res'][0][0]            monitor_list=[]            for each in result['res']:                monitor_time = each[5].strftime('%Y-%m-%d %H:%M:%S')                monitor={}                monitor['threshold']=each[0]                monitor['monitoritem']=each[1]                monitor['state']=each[2]                monitor['value']=each[3]                monitor['card']=each[4]                monitor['monitortime']=monitor_time                monitor_list.append(monitor)            ret_json['data']=monitor_list        except Exception, e:            print "error %s" % str(e)            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = e.message            print e        print ret_json        return ret_json    '''    分组重命名    '''    def group_rename(self,id,name):        print id,name        ret_json = {'status': Constant.SUCCESS_CODE}        try:            select1="update ssd_group set group_name='%s' where group_id=%d;" %(name,int(id))            select2="select * from ssd_group where group_id=%d;"%(int(id))            result1=SSDItem().operate_db_not_select(select1)            if result1['status']!=10000:                ret_json['status'] = Constant.ERROR_CODE            result2=SSDItem().operate_db_select(select2)            if result2['status']!=10000:                ret_json['status']=Constant.ERROR_CODE            ret_json['group_id']=id            ret_json['newname']=result2['res'][0][1]            # return  ret_json        except Exception, e:            print "error %s" % str(e)            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = e.message        print ret_json        return ret_json    '''    主机移动到组    '''    def move_group(self,list_id,old_group_id,new_group_id):        ret_json = {'status': Constant.SUCCESS_CODE}        try:            for item in list_id:                select1 = "update ssd_host set group_id=%d where id=%d;" % (int(new_group_id),int(item))                result1=SSDItem().operate_db_not_select(select1)                if result1['status']!=10000:                    ret_json['status'] = Constant.ERROR_CODE            select2 = "select id,ip from ssd_host where group_id=%d;" % (int(old_group_id))            result2=SSDItem().operate_db_select(select2)            if result2['status']!=10000:                ret_json['status']=Constant.ERROR_CODE            ip_list=[]            for item in result2['res']:                ip_dict={}                ip_dict['id']=item[0]                ip_dict['ip']=item[1]                ip_list.append(ip_dict)            ret_json['data']=ip_list        except Exception, e:            print "error %s" % str(e)            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = e.message        return ret_json    '''    删除主机    '''    def delete_host(self,list_id):        ret_json = {'status': Constant.SUCCESS_CODE}        # ret_json={'msg':Constant.SUCCESS_MSG}        try:            for item in list_id:                select1 = "delete from ssd_host where id=%d;" % (int(item))                select2="delete from ssd_monitor where host_id=%d;" % (int(item))                select4="select ip,mask from ssd_host where id=%d;"%(int(item))                result4 = SSDItem().operate_db_select(select4)                if result4['status'] != 10000:                    ret_json['status'] = Constant.ERROR_CODE                else:                    print result4                    ip=result4['res'][0][0]                    mask=result4['res'][0][1]                    select3="delete from ssd_warning where warn_ip = '%s' and warn_mask = '%s';"%(ip,mask)                    result3 = SSDItem().operate_db_not_select(select3)                    if result3['status']!=10000:                        ret_json['status'] = Constant.ERROR_CODE                    result2 = SSDItem().operate_db_not_select(select2)                    if result2['status']!=10000:                        ret_json['status'] = Constant.ERROR_CODE                    result1 = SSDItem().operate_db_not_select(select1)                    if result1['status']!=10000:                        ret_json['status'] = Constant.ERROR_CODE        except Exception, e:            print "error %s" % str(e)            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = e.message        return ret_json    '''    插入前台轮询时间,后台刷新时间    '''    def time_config(self, config_time,app_time_hour,app_time_minute,app_time_second):        ret_json = {'status': Constant.SUCCESS_CODE}        try:            select1="insert into ssd_config_time(config_time,app_time_hour,app_time_minute,app_time_second) VALUES('%s','%s','%s','%s');" %(config_time,app_time_hour,app_time_minute,app_time_second)            select2="insert into ssd_group(group_name) VALUES('un_group');"            result=SSDItem().operate_db_not_select(select1)            if result['status']!=10000:                ret_json['status'] = Constant.ERROR_CODE            result2 = SSDItem().operate_db_not_select(select2)            if result2['status'] != 10000:                ret_json['status'] = Constant.ERROR_CODE            ret_json['config_time']=config_time        except Exception, e:            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = e.message        return ret_json    '''    主机搜索    '''    def host_search(self,host,mask):        ret_json = {'status': Constant.SUCCESS_CODE}        try:            select1="select ip,cardinfo,id,hostname from ssd_host where ip='%s' and mask='%s';" %(host,mask)            # count="select count(*) from ssd_warning where warn_ip='%s' and warn_mask='%s';" %(host,mask)            count="select count(*) from ssd_monitor a LEFT OUTER JOIN ssd_host b on a.host_id=b.id where a.state <> 'normal' and b.ip='%s' and b.mask='%s';" %(host,mask)            select2="select b.threshold, a.monitoritem,a.host_id, a.state, a.value, a.card,a.monitor_time from ssd_monitor a LEFT OUTER JOIN ssd_threshold b on a.monitoritem = b.monitoritem where(a.host_id, a.monitoritem, a.monitor_time) in (select host_id, monitoritem, max(monitor_time) from ssd_monitor group by host_id, monitoritem) and a.host_id =(select id from ssd_host where ip='%s' and mask='%s');" %(host,mask)            select3="select b.threshold,a.monitoritem,a.host_id,a.state,a.value,a.card from ssd_monitor a LEFT OUTER JOIN ssd_threshold b on a.monitoritem=b.monitoritem where a.host_id=(select id from ssd_host where ip='%s' and mask='%s');" %(host,mask)            result=SSDItem().operate_db_select(select1)            result1=SSDItem().operate_db_select(select2)            result3=SSDItem().operate_db_select(count)            ip_list=[]            for item in result1['res']:                monitor_time = item[6].strftime('%Y-%m-%d %H:%M:%S')                print item                monitor_dict={}                monitor_dict['threshold']=item[0]                monitor_dict['monitoritem']=item[1]                monitor_dict['state']=item[3]                monitor_dict['value']=item[4]                monitor_dict['card']=item[5]                monitor_dict['monitortime']=monitor_time                ip_list.append(monitor_dict)            for item in result['res']:                ret_json['ip']=item[0]                ret_json['card_info']=item[1]                ret_json['hostname']=item[3]            ret_json['monitor_data']=ip_list            ret_json['error_num']=result3['res'][0][0]        except Exception, e:            ret_json['status'] = Constant.ERROR_CODE            ret_json['msg'] = e.message        return ret_json