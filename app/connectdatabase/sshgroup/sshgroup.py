# encoding: utf-8

# from api.constant.Constant import Constant

# from app.model.initgroup_app.initgroup_app import SSDItem

import psycopg2
import paramiko
import time
# from app.connectdatabase.postgre import ConnectDB


class SSHgroup(object):
    def executesql(self,tag,sql1,*args):
        ret_json = {'status': 10000}

        conn=psycopg2.connect(database='ssd', user='ssd', password='ssd', host='127.0.0.1', port=5432)

        if conn:

            print "postgresql connect successfully!!"

        else:

            print "postgresql connect error!"
        cur = conn.cursor()
        try:
            if tag == 'two':
                cur.execute(sql1, (args[0], args[1]))

            if tag == 'four':
                cur.execute(sql1, (args[0], args[1],args[2],args[3]))

            elif tag == 'one':
                cur.execute(sql1,(args[0]))

            elif tag=='senven':

                cur.execute(sql1,(args[0],args[1],args[2],args[3],args[4],args[5],args[6]))

            else:

                cur.execute(sql1)
            conn.commit()

            if cur is not None:

                rows=cur.fetchall()

                ret_json['res']=rows

        except Exception, e:

            ret_json['status'] = 10001

            ret_json['msg'] = e.message

        finally:

            cur.close()

            conn.close()

        return ret_json

    def connect_db(self):

        conn=psycopg2.connect(database="ssd",user="ssd",password="ssd",host="127.0.0.1",port="5432")

        if conn:

            print "postgresql connect successfully!!"

        else:

            print "postgresql connect error!"

        return conn


    def Cmd(self,ip,user,password,port,cmd):
        ret_json = {'status': 10000}
        # ret_json ={}


        # try:
        ssh = paramiko.SSHClient()

        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        ssh.connect(hostname=ip, port=port, username=user, password=password,timeout=3)

        stdin, stdout, stderr = ssh.exec_command(cmd)

        result = stdout.read()
        ssh.close()

        result_decode = result.decode()



        if 'cmd  error' in result:
            print "error %s" % result

            ret_json['status'] = '10001'

            ret_json['msg'] = result
            pass
        else:
            ret_json['data']=result_decode

            # return  result_decode

        # except Exception, e:
        #     print "error %s" % str(e)
        #
        #     ret_json['status'] = '10001'
        #
        #     ret_json['msg'] = e.message
        #     pass
        return ret_json



    def select_sshhost_info(self,sshgroup_id):

        ret_json = {'status': 10000}

        try:

            select2=("select a.ip,a.username,a.password,a.port,a.id,a.sshgroup_id,b.ip,b.username,b.password,b.port from ssd_host a LEFT JOIN ssd_sshgroup b on a.sshgroup_id=b.sshgroup_id where b.sshgroup_id=%s;")

            result=self.executesql('one',select2,sshgroup_id)


            data_list=[]
            for item in result['res']:

                result_dict={}
                result_dict['ip']=item[0]
                result_dict['username']=item[1]
                result_dict['password']=item[2]
                result_dict['port']=item[3]
                result_dict['id']=item[4]
                result_dict['sshgroup_id'] = item[5]
                result_dict['ssh_ip']=item[6]
                result_dict['ssh_username']=item[7]
                result_dict['ssh_password']=item[8]
                result_dict['ssh_port']=item[9]

                data_list.append(result_dict)
                # ret_json['data']=data_list
                # ret_json['sshgroup_id']=item[5]
            ret_json['data']=data_list

        except Exception, e:

            print "error %s" % str(e)

            ret_json['status'] = 10001

            ret_json['msg'] = e.message

        return ret_json

    '''处理第一个卡信息'''
    def operate_cardinfo(self,card_info1):

        card_info1_dict={}

        card_info1_dict['a']=card_info1[1][:-1].replace(" ","")
        card_info1_dict['c']=card_info1[2].split("\'")[1]
        # print "111111111111111111111111111111111111111111"
        # print card_info1_dict['c']
        card_info1_dict['f']=card_info1[3].split("\'")[1]
        card_info1_dict['d']=card_info1[4].split("\'")[1]
        card_info1_dict['e']=card_info1[5].split("\'")[1]
        card_info1_dict['rb']=card_info1[6].split("\'")[1]
        card_info1_dict['ri']=card_info1[7].split("\'")[1]
        card_info1_dict['rl']=card_info1[8].split("\'")[1]
        card_info1_dict['wb']=card_info1[9].split("\'")[1]
        card_info1_dict['wi']=card_info1[10].split("\'")[1]
        card_info1_dict['wl']=card_info1[11].split("\'")[1]
        card_info1_dict['s']=card_info1[12].split("\'")[1]
        # print card_info1_dict
        return card_info1_dict

    def get_monitor_state(self,monitor_item_value_list):

        conn=self.connect_db()

        cur=conn.cursor()

        # cur.execute("select a.monitoritem,a.value,b.threshold,b.warning,b.danger from ssd_monitor a LEFT OUTER JOIN ssd_threshold b on a.monitoritem=b.monitoritem;")
        cur.execute("select b.monitoritem,b.threshold,b.warning,b.danger from ssd_threshold b;")

        values=cur.fetchall()

        conn.commit()

        state_json={}
        # monitor_item_value_list = ConnectDB().get_monitor_info()
        ControllerTemperature=monitor_item_value_list[0]['Controller Temperature']
        # ControllerTemperature='95'
        AccessMode=monitor_item_value_list[0]['Access Mode']

        Estimated_Life_Left=monitor_item_value_list[0]['Estimated_Life_Left']
        SEUFlag=monitor_item_value_list[0]['SEU Flag']
        MediaStatus=monitor_item_value_list[0]['Media Status']
        DynamicBadBlocks=monitor_item_value_list[0]['Dynamic Bad Blocks']
        FlashTemperature=monitor_item_value_list[0]['Flash Temperature']

        for i in values:

            if i[0]=='Controller Temperature':

                if ControllerTemperature<i[2]:

                    state_json[i[0]]='normal'
                    print "normal"

                elif i[2]<=ControllerTemperature<i[3]:

                    state_json[i[0]]='warning'
                else:
                    state_json[i[0]]='danger'


            elif i[0]=='Access Mode':
                print AccessMode

                if cmp(AccessMode,i[1])==0:
                    print AccessMode

                    state_json[i[0]]='normal'

                elif cmp(AccessMode,i[2])==0:
                    print i[2]

                    state_json[i[0]]='warning'
                elif cmp(AccessMode,i[3])==0:
                    state_json[i[0]]='danger'
                else:
                    state_json[i[0]]='error'


            elif i[0]=='Estimated_Life_Left':

                if Estimated_Life_Left>i[2]:

                    state_json[i[0]]='normal'

                elif i[2]<=Estimated_Life_Left<i[3]:

                    state_json[i[0]]='warning'
                else:
                    state_json[i[0]]='danger'

            elif i[0]=='Media Status':

                if cmp(MediaStatus,i[1])==0:

                    state_json[i[0]]='normal'

                else:

                    state_json[i[0]]='danger'

            elif i[0]=='Dynamic Bad Blocks':

                if DynamicBadBlocks<i[1]:

                    state_json[i[0]]='normal'

                else:

                    state_json[i[0]]='danger'

            elif i[0]=='SEU Flag':

                if cmp(SEUFlag,i[1])==0:

                    state_json[i[0]]='normal'

                else:

                    state_json[i[0]]='danger'

            elif i[0]=='Flash Temperature':

                if FlashTemperature< i[2]:

                    state_json[i[0]] = 'normal'
                    print "normal"

                elif i[2] <= FlashTemperature < i[3]:

                    state_json[i[0]] = 'warning'
                else:
                    state_json[i[0]] = 'danger'

            else:

                 state_json[i[0]]='normal'

        return state_json

    def monitor_to_db(self,monitor_item_value_list,state_json):
        ret_json = {'status': 10000}

        conn=self.connect_db()

        cur=conn.cursor()

        # monitor_item_value_list=ConnectDB().get_monitor_info()

        # state_json=ConnectDB().get_monitor_state()

        update_state="update ssd_monitor set state=%s where monitoritem=%s;"
        update_card = ("UPDATE ssd_host set cardinfo=%s where id=%s;")

        insert_sql = "insert into ssd_monitor(monitoritem,value,host_id,card)values(%s,%s,%s,%s);"

        delect_sql="DELETE from ssd_monitor; "

        '''为了测试用先删除再添加 '''

        try:

            for item in monitor_item_value_list:
                card = item['card_total']

                cur.execute(update_card, (card, item['id']))

                conn.commit()

                cur.execute("select id from ssd_host where ip=%s",(item['ip'],))

                id_db=cur.fetchall()

                conn.commit()

                id=id_db[0][0]
                card=item['card']

                for key in item:

                    # print key

                    if key!='ip'and key!='card' and key!='card_total' and key!='id':

                        cur.execute(insert_sql,(key,item[key],id,card))

                        conn.commit()

            try:

                for key in state_json:

                    cur.execute(update_state,(state_json[key],key))

                    conn.commit()

                print "postgresql update successful!"

            except Exception as e:

                ret_json['status'] = 10001

                ret_json['msg'] = 10004

                print "error %s" % str(e)

            print "postgresql insert successful!"

        except Exception as e:

            print "#####################################"
            ret_json['status'] = 10001

            ret_json['msg'] = 10004

            print "error %s" % str(e)

        finally:

            cur.close()

            conn.close()


    '''处理获得的数据并存入数据库'''
    def save_to_db(self,card_list,ip,id):
        card_info=card_list
        if card_info is not None:
            monitor_item_value_list=[]
            for item in card_info:
                # print "-----------------------------"
                # print item
                monitor_item_value = {}

                monitor_item_value['ip'] =ip
                monitor_item_value['id'] =id

                monitor_item_value['card_total'] = item['card_total'].split("\'")[1]


                monitor_item_value['card'] = item['card']
                card_info1=item['card_info_1'].split(",")
                # print card_info1
                card_info1=SSHgroup().operate_cardinfo(card_info1)


                monitor_item_value['Access Mode'] = card_info1['a']

                monitor_item_value['Controller Temperature'] = card_info1['c']

                monitor_item_value['Flash Temperature'] = card_info1['f']

                monitor_item_value['Dynamic Bad Blocks'] = card_info1['d']

                monitor_item_value['Estimated_Life_Left'] = card_info1['e'] + '%'

                monitor_item_value['host_read_bandwidth'] = card_info1['rb']

                monitor_item_value['host_read_iops'] = card_info1['ri']

                monitor_item_value['host_read_latency'] = card_info1['rl']

                monitor_item_value['host_write_bandwidth'] = card_info1['wb']

                monitor_item_value['host_write_iops'] = card_info1['wi']

                monitor_item_value['host_write_latency'] = card_info1['wl']

                monitor_item_value['Media Status'] = item['card_info_2']

                monitor_item_value['SEU Flag'] = card_info1['s']

                monitor_item_value_list.append(monitor_item_value)

                monitor_state=self.get_monitor_state(monitor_item_value_list)

                result=self.monitor_to_db(monitor_item_value_list,monitor_state)
                print result
                return result

    # def get_cardinfo(self,id,result_card):
    #
    #     if result_card is not None:
    #         card = result_card.splitlines()
    #         card_info={}
    #         # card_info['ip']=ip
    #         card_info['id']=id
    #         card_info['cardinfo']=card
    #
    #
    #
    #     print card_info
    #
    #     return card_info
    '''将监控项状态值为danger的值存入告警信息表,将超过一天的数据添加到ssd_arch_warning'''

    def monitor_operate(self):
        ret_json = {}

        conn = SSHgroup().connect_db()

        cur = conn.cursor()

        insert_warn = "insert into ssd_warning (warn_ip,warn_mask,warn_level,warn_item,ssd_value,warn_time,ssd_threshold,card,hostname)select a.ip,a.mask,b.state,b.monitoritem,b.value,b.monitor_time,b.threshold,b.card,a.hostname from ssd_host a LEFT OUTER JOIN(select c.host_id,c.state,c.monitoritem,c.value,c.monitor_time,c.card,d.threshold from ssd_monitor c ,ssd_threshold d where c.monitoritem=d.monitoritem)b on a.id=b.host_id where b.state='danger' ;"

        # select="select * from ssd_warning;"

        # delect_warn1="DELETE from ssd_warning; "
        insert_old_data = (
            "insert into ssd_arch_warning(monitoritem,state,old_value,old_time,host_id) select monitoritem,state,value,monitor_time,host_id from ssd_monitor where monitor_time<= now() - interval '1 day';")
        delete_old_data = ("delete from ssd_monitor where monitor_time<= now() - interval '1 day';")
        delect_warn = "delete from ssd_monitor where state='danger'; "

        try:

            cur.execute(insert_warn)
            cur.execute(insert_old_data)
            cur.execute(delete_old_data)
            cur.execute(delect_warn)

            conn.commit()

            data = "monitor operate successful!"
            ret_json['msg'] = data
            ret_json['status'] = '10000'


        except Exception as e:

            print "error %s" % str(e)
            ret_json['status'] = '10001'
            ret_json['msg'] = e.message

        finally:

            print "pg closed!"

            cur.close()

            conn.close()
        return ret_json

    def execute_ssh_host(self):
        # ret_json = {'status': 10000}
        ret_json = {}
        try:

            select1=("select sshgroup_id from ssd_sshgroup;")
            result = self.executesql('none', select1)

            for item in result['res']:
                sshgroup_id=item
                host_info = SSHgroup().select_sshhost_info(sshgroup_id)

                for item_host in host_info['data']:



                    cmd='./get_hostinfo.sh'+" "+item_host['ip']+" "+item_host['username']+" "+item_host['password']+" "+item_host['port']
                    print 'cmd_start'+item_host['ssh_ip']+'     '+item_host['ip']


                    result=SSHgroup().Cmd(item_host['ssh_ip'],item_host['ssh_username'],item_host['ssh_password'],int(item_host['ssh_port']),cmd)
                    print "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
                    print result
                    if result['status']=='10001':
                        ret_json['status']='10001'
                        ret_json['msg']=result['msg']

                    else:

                        card_list=[]


                        if result['data'] is not None:
                            result1=result['data'].splitlines()
                        else:
                            result1=None
                            ret_json['status'] = '10001'
                        print result1


                        i=0

                        while i<len(result1):
                            if (len(result1)%4)==0:
                                card_dict2 = {}
                                card_dict2['card_total'] = result1[i]
                                card_dict2['card'] = result1[i+1]
                                card_dict2['card_info_1'] = result1[i + 2]
                                card_dict2['card_info_2'] = result1[i + 3]

                                card_list.append(card_dict2)
                            else:
                                print result1
                                print 'error!'
                            i=i+4

                        # print card_list

                        # SSHgroup().get_cardinfo(item_host['id'],card_list)
                        result=SSHgroup().save_to_db(card_list,item_host['ip'],item_host['id'])

                        ret_json['status'] = '10000'
                        ret_json['data']=result

        except Exception, e:

            print "error %s" % str(e)

            ret_json['status'] = '10001'

            ret_json['msg'] = e.message

        return ret_json

'''定时取数'''

def sleeptime():

    conn =SSHgroup().connect_db()
    cur = conn.cursor()

    select_apptime = ("select * from ssd_config_time where app_time_hour is not null;")

    try:

        cur.execute( select_apptime)

        values = cur.fetchall()

        conn.commit()

        value=values[0]
        id=value[0]
        config_time=value[1]
        app_time_hour=value[2]
        app_time_minute=value[3]
        app_time_second=value[4]
        return app_time_hour*3600 + app_time_minute*60 + app_time_second

    except Exception as e:

        print "postgresql insert old error!"

        print "error %s" % str(e)

    finally:

        print "pg closed!"

        cur.close()

        conn.close()

if __name__ == '__main__':


    second = sleeptime()
    print "------------------------------"

    print second
    if second is None:
        second=300

    while 1==1:

        SSHgroup().execute_ssh_host()
        SSHgroup().monitor_operate()
        time.sleep(second)
        print time.time(), 'do sth'




