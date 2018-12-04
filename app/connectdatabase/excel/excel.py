# -*- coding: utf8 -*-
# !/usr/bin/python
import xlrd

def excel(fname):

     bk = xlrd.open_workbook(fname)
     shxrange = range(bk.nsheets)
     sh=None
     try:
        # sh = bk.sheet_by_name(tablename)
        sh= bk.sheet_by_index(0)


     except Exception, e:
         print e
     return sh

def operate_excel_group(fname):
    bk = xlrd.open_workbook(fname)
    shxrange = range(bk.nsheets)
    sh = None
    try:
        # sh = bk.sheet_by_name(tablename)
        sh = bk.sheet_by_index(1)


    except Exception, e:
        print e

    rows=sh.nrows
    cols=sh.ncols
    group_list=[]
    a=1
    while a<rows:
        row_data =sh.row_values(a)
        row_dict={}
        row_dict['group_name']=str(row_data[0])
        group_list.append(row_dict)
        a=a+1
    print group_list
    return group_list

def operate_excel_host(fname):
    data=excel(fname)
    rows=data.nrows
    cols=data.ncols
    host_list=[]
    a=1
    while a<rows:
        row_data =data.row_values(a)
        # print row_data[0]
        
        try:
            password=int(row_data[2])
        except Exception as e:

            password=row_data[2]

        row_dict={}

        row_dict['ip']=str(row_data[0])
        row_dict['hostname']=str(row_data[6])
        row_dict['sshgroup_ip']=str(row_data[7])
        row_dict['username']=str(row_data[1])
        row_dict['password']=password
        row_dict['port']=int(row_data[3])

        row_dict['mask']=str(row_data[4])
        row_dict['group_name']=str(row_data[5])
        host_list.append(row_dict)
        a=a+1

    return host_list


def operate_excel_sshgroup(fname):
    bk = xlrd.open_workbook(fname)
    shxrange = range(bk.nsheets)
    sh = None
    try:
        # sh = bk.sheet_by_name(tablename)
        sh = bk.sheet_by_index(2)


    except Exception, e:
        print e

    rows=sh.nrows
    cols=sh.ncols
    sshgroup_list=[]
    a=1
    while a<rows:
        row_data =sh.row_values(a)
        try:
            password = int(row_data[2])
        except Exception as e:

            password = row_data[2]
        row_dict={}
        row_dict['ip']=str(row_data[0])
        row_dict['username']=str(row_data[1])
        row_dict['password']=password
        row_dict['port']=int(row_data[3])
        sshgroup_list.append(row_dict)
        a=a+1
    print sshgroup_list
    return sshgroup_list



# if __name__ == '__main__':
#     # operate_excel_group("E://host//host.xlsx","Sheet2")
#     operate_excel_host("E://host//host.xlsx")


# def excel(fname):
#     bk = xlrd.open_workbook(fname)
#     shxrange = range(bk.nsheets)
#     try:
#         sh = bk.sheet_by_name("Sheet1")
#         group_data=bk.sheet_by_name("Sheet2")
#     except:
#         print "no sheet in %s " % fname
#     rows=group_data.nrows
#     cols=group_data.ncols
#     group_list=[]
#     a=1
#     while a<rows:
#         row_data = group_data.row_values(a)
#         row_dict={}
#         row_dict['group_name']=str(row_data[0])
#         group_list.append(row_dict)
#         a=a+1
#     print group_list
#     return group_list

# 获取行数
#     nrows = sh.nrows
# 获取列数
#     ncols = sh.ncols
    # print "nrows %d, ncols %d" % (nrows, ncols)
# 获取第一行第一列数据
#     cell_value = sh.cell_value(0, 2)
#     print cell_value

    # row_list = []
# 获取各行数据

    # i=1
    # while i<nrows:
    #     row_data = sh.row_values(i)
    #     row_dict={}
    #
    #     row_dict['ip']=str(row_data[0])
    #     row_dict['username']=str(row_data[1])
    #     row_dict['password']=str(row_data[2])
    #     row_dict['port']=str(row_data[3])
    #     row_dict['mask']=str(row_data[4])
    #     row_dict['group_name']=str(row_data[5])
    #
    #     row_list.append(row_dict)
    #     i=i+1
    # print row_list
    # return row_list





# if __name__ == '__main__':
#     excel("E://host//host.xlsx")


