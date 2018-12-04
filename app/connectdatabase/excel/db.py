# !/usr/bin/python
# -*- coding: UTF-8 -*-
from app.connectdatabase.excel.excel import operate_excel_group
from app.connectdatabase.excel.excel import operate_excel_host
from app.public.util import unicode_to_object
from api.constant.Constant import Constant
import psycopg2
import time
from app.config import Config
class ConnectDB(object):
    def connect_db(self):
        #connect SSD database
        start_time = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        print "%s : operate database ..." %(start_time)
        conn = psycopg2.connect(database=Config.SSD_DATABASE_NAME, user=Config.SSD_DATABASE_USERNAME, password=Config.SSD_DATABASE_PASSWORD, host=Config.SSD_DATABASE_IP, port=Config.SSD_DATABASE_PORT)
        if conn:
            print "postgresql connect successfully!!"
        else:
            print "postgresql connect error!"
        return conn

    def insert_group(self,x):
        db=ConnectDB().connect_db()
        cur=db.cursor()
        insert_group_sql='''INSERT INTO ssd_group(group_name)VALUES(%s);'''
        ret_json = {'status': Constant.SUCCESS_CODE}
        try:

            for item in x:

                group_name=(""+item['group_name']+"",)
                cur.execute(insert_group_sql,(group_name))
                # 提交到数据库执行
                db.commit()

            print "postgresql group_insert  successful!"
        except Exception as e:
            ret_json['status'] = Constant.ERROR_CODE
            ret_json['msg'] = e.message
            print "error %s" % str(e)
            # Rollback in case there is any error
        cur.close()
        db.close()
        # end_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        # print "%s : check database info finished!" % (end_time)
        return ret_json
    def insert_sshgroup(self,x):
        db=ConnectDB().connect_db()
        cur=db.cursor()

        ret_json = {'status': Constant.SUCCESS_CODE}
        try:

            for item in x:
                insert_sshgroup_sql = "INSERT INTO ssd_sshgroup(ip,username,password,port)VALUES('%s','%s','%s','%s');" % (item['ip'], item['username'], item['password'], item['port'])
                # print type(item['group_name'])
                # group_name=(""+item['group_name']+"",)
                cur.execute(insert_sshgroup_sql)
                # 提交到数据库执行
                db.commit()

            print "postgresql sshgroup_insert  successful!"
        except Exception as e:
            ret_json['status'] = Constant.ERROR_CODE
            ret_json['msg'] = e.message

            print "error %s" % str(e)
            # Rollback in case there is any error
        cur.close()
        db.close()
        return ret_json


    def insert_host(self,x):

        db=ConnectDB().connect_db()
        cur=db.cursor()
        select_sql='''select group_id from ssd_group where group_name=%s; '''

        insert_host_sql='''INSERT INTO ssd_host(hostname,ip,mask,username,password,port,group_id,sshgroup_id)VALUES(%s,%s,%s,%s,%s,%s,%s,%s);'''
        ret_json = {'status': Constant.SUCCESS_CODE}

        try:

            for item in x:
                print item

                try:

                    group_name=(""+item['group_name']+"",)
                    cur.execute(select_sql,(group_name))
                    rows=cur.fetchall()
                    db.commit()
                    id=rows[0][0]

                    select_sql1 = "select sshgroup_id from ssd_sshgroup where ip='%s';" % (item['sshgroup_ip'])
                    cur.execute(select_sql1)
                    rows = cur.fetchall()
                    db.commit()
                    sshgroup_id= rows[0][0]



                    cur.execute(insert_host_sql,(item['hostname'],item['ip'], item['mask'], item['username'], item['password'], item['port'],id,sshgroup_id))
                    db.commit()

                    cur.execute("select * from ssd_host left OUTER JOIN ssd_group on ssd_host.group_id=ssd_group.group_id;")
                    db.commit()


                except Exception as e:
                    print "postgresql initial failure!"
                    print "error %s" % str(e)

            # print "postgresql initial  successful!"
        except Exception as e:
            ret_json['status'] = Constant.ERROR_CODE
            ret_json['msg'] = e.message
            print "error %s" % str(e)
            # Rollback in case there is any error
            db.rollback()

        cur.close()   # 关闭数据库连接
        db.close()
        end_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        print "%s : check database info finished!" % (end_time)
        return ret_json



# if __name__ == '__main__':
#     group=operate_excel_group("E://host//host.xlsx")
#     host=operate_excel_host("E://host//host.xlsx")
#     ConnectDB().insert_group(group)
#     ConnectDB().insert_host(host)
