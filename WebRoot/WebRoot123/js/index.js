



//addhosthtml += '</form>';



$(".addhost").click(function(){
	var addhosthtml = '';	
	addhosthtml += '<div class="addhosts" >';
	addhosthtml += '<form role="form" id="host_add_form">';
	addhosthtml += '<div class="form-group">';
	addhosthtml += '<label for="ip" class="col-sm-2 control-label">IP:</label>';
	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="ip" id="ip" placeholder="请输入IP"></div>';
	addhosthtml += '</div>';
	addhosthtml += '<div class="form-group">';
	addhosthtml += '<label for="mask" class="col-sm-2 control-label">mask:</label>';
	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="mask" id="mask" placeholder="请输入mask"></div>';
	addhosthtml += '</div>';
	addhosthtml += '<div class="form-group">';
	addhosthtml += '<label for="port" class="col-sm-2 control-label">port:</label>';
	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="port" id="port" placeholder="请输入port"></div>';
	addhosthtml += '</div>';
	addhosthtml += '<div class="form-group">';
	addhosthtml += '<label for="username" class="col-sm-2 control-label">username:</label>';
	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="username"  id="username" placeholder="请输入user"></div>';
	addhosthtml += '</div>';

	addhosthtml += '<div class="form-group">';
	addhosthtml += '<label for="password" class="col-sm-2 control-label">password:</label>';
	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="password" id="password" placeholder="请输入password"></div>';
	addhosthtml += '</div>';
	addhosthtml += '</form>';
	addhosthtml += '<div class="form-group">';
	addhosthtml += '<label for="group" class="col-sm-2 control-label">分组:</label>';
	var grouphtml='';
			$.ajax({
				type: 'post',
				async:false,
				url: '/api/v1/ssd/initgroup',
				contentType:'application/json',
				success:function(data){
					grouphtml+='<select id="group_id" class="groups form-control">';
					var group_list = data.group_list;
					for(var index in group_list){	
						grouphtml += '<option value="'+group_list[index].group_id+'">'+group_list[index].group_name+'</option>';
					}
					grouphtml+='</select>';
				}
			})
	addhosthtml += '<div class="col-sm-8">'+grouphtml+'</div>';
	addhosthtml += '<div class="col-sm-1 col-md-1">';
	addhosthtml += '<button class="btn btn-default initialaddgroup">创建</button>';
	addhosthtml += '</div>';
	addhosthtml += '</div>';
	addhosthtml += '</div>';
	
	
    $.confirm({
        title: '添加',
        type:'blue',
        content:addhosthtml,
        onContentReady: function () {
            $("input[type=file]").change(function(){$(this).parents(".uploader").find(".filename").val($(this).val());});
            $("input[type=file]").each(function(){
                if($(this).val()==""){$(this).parents(".uploader").find(".filename").val("No file selected...");}
            });
			$('.initialaddgroup').click(add_group);
			$('form').bootstrapValidator({  
				message: '校验未通过',  
				feedbackIcons: {  
					valid: 'glyphicon glyphicon-ok',  
					invalid: 'glyphicon glyphicon-remove',  
					validating: 'glyphicon glyphicon-refresh'  
				},  
				fields: {  
					ip: {  
						validators: {  
							notEmpty: {  
								message: 'ip不能为空'  
							},  
							regexp: {  
								regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,  
								message: 'ip格式不对，请重新输入'  
							}  
						}  
					},  
					mask: {  
						validators: {  
							notEmpty: {  
								message: 'mask不能为空'  
							},  
							regexp: {  
								regexp: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/,  
								message: 'mask格式不对，请重新输入'  
							}  
						}  
					}, 
					port: {  
						validators: {  
							notEmpty: {  
								message: 'port不能为空'  
							},  
							between: {  
								min:0,
								max:65535,
								message:'port必须在0-65535之间'
							}  
						}  
					}, 
					username: {  
						message: '用户名验证失败',  
						validators: {  
							notEmpty: {  
								message: '用户名不能为空'  
							},  
							stringLength: {  
								min: 1,  
								max: 18,  
								message: '用户名长度必须在1到18位之间'  
							},  
							regexp: {  
								regexp: /^[a-zA-Z0-9_]+$/,  
								message: '用户名只能包含大写、小写、数字和下划线'  
							}  
						}  
					},  
					password: {  
						message: '密码验证失败',  
						validators: {  
							notEmpty: {  
								message: '密码不能为空'  
							},  
							stringLength: {  
								min: 1,  
								max: 18,  
								message: '密码长度必须在1到18位之间'  
							},  
							regexp: {  
								regexp: /^[a-zA-Z0-9_]+$/,  
								message: '密码只能包含大写、小写、数字和下划线'  
							}  
						}  
					},  
					
				}  
			});  
        },
        buttons: {
            formSubmit: {
                text: '确定',
                btnClass: 'btn-blue',
                action: function () {
					var bootstrapValidator = $("#host_add_form").data('bootstrapValidator');
					bootstrapValidator.validate();
					if(bootstrapValidator.isValid()){
						
						if($("#group_id").val() == '' || typeof($("#group_id").val()) == 'undefined' ){
							$.alert({
								title: '提示',
								type:'orange',
								content: '请选择分组'
							})
							return false;
						}
						console.log('{"ip":"'+$('#ip').val()+'","mask":"'+$("#mask").val()+'","port":"'+$("#port").val()+'","username":"'+$("#username").val()+'","password":"'+$("#password").val()+'","group_id":"'+$("#group_id").val()+'"}')
						$.ajax({
							url:'/api/v1/ssd/insert_host',
							type:'post',
							data:'{"ip":"'+$('#ip').val()+'","mask":"'+$("#mask").val()+'","port":"'+$("#port").val()+'","username":"'+$("#username").val()+'","password":"'+$("#password").val()+'","group_id":"'+$("#group_id").val()+'"}',
							contentType:'application/json',
							success:function(data){
								console.log(data)
								if(data.status==10000){
									$.alert({
										title: '提示',
										type:'orange',
										content: '添加成功',
										onClose:function(){
											window.location.reload();
										}
									});
							
								}else if(data.status==10001){
									$.alert({
										title: '提示',
										type:'orange',
										content: '主机已存在，无法添加',
										onClose:function(){
											window.location.reload();
										}
									});
							
								}
								else{
									$.alert({
										title: '提示',
										type:'orange',
										content: '请求失败，请重试'
									});
									return false;
								}
							},
							error:function(){
								$.alert({
									title: '提示',
									type:'orange',
									content: '请求超时，请重试'
								});
								return false;
							}
						})
					}else{
						$.alert({
							title: '提示',
							type:'orange',
							content: '表单校验失败，请检查'
						});
						return false;
					}
                }
            },
            formCancel:{
                text:'取消',
                action: function () {
                    //close
                }
            }
        }

    });
});
var addgrouphtml = '';
addgrouphtml +='<label>分组名称：<input type="text" id="group_name" class="form-control" placeholder="请输入分组名称" style="display: inline-block;width: auto"></label>';
$(".addgroup").click(function(){
    add_group();
});

function add_group(){
	$.confirm({
        title: '创建',
        type:'blue',
        content:addgrouphtml,
        onContentReady: function () {
			
        },
        buttons: {
            formSubmit: {
                text: '确定',
                btnClass: 'btn-blue',
                action: function () {
					$.ajax({
						url:'/api/v1/ssd/create_group',
						type:'post',
						data:'{"group_name":"'+$('#group_name').val()+'"}',
						contentType:'application/json',
						success:function(data){
							console.log(data)
							if(data.status==10000){
								$.alert({
									title: '提示',
									type:'orange',
									content: '添加成功',
									onClose:function(){
										window.location.reload();
									}
								});
								
							}else{
								$.alert({
								title: '提示',
								type:'orange',
								content: '请求失败，请重试'
							});
							}
						},
						error:function(){
							$.alert({
								title: '提示',
								type:'orange',
								content: '请求超时，请重试'
							});
						}
					})
                }
            },
            formCancel:{
                text:'取消',
                action: function () {
                    //close
                }
            }
        }

    });
}



$(".deletegroup").click(function(){
	var deletegrouphtml = '<button class="btn btn-success btn-xs" id="checkAll" style="margin-right: 10px;">全选</button>';
	$.ajax({
		type: 'post',
		url: '/api/v1/ssd/initgroup',
		async:false,
		contentType:'application/json',
		success:function(data){
			
			var group_list = data.group_list;
			for(var index in group_list){
				if(group_list[index].group_name != 'un_group'){
					deletegrouphtml += '<label class="checkbox-inline"><input class="userid" type="checkbox" name="delete_group" value="'+group_list[index].group_id+'"/>'+group_list[index].group_name+'</label>';
				}
				
			}

		}
	})
    $.confirm({
        title: '删除',
        type:'blue',
        content:deletegrouphtml,
        onContentReady: function () {
			$("#checkAll").click(function() {
			$("input[name=delete_group]").each(function() {   
			this.checked = true;   
			});   
			}); 
        },
        buttons: {
            formSubmit: {
                text: '确定',
                btnClass: 'btn-blue',
                action: function () {
                    var id_list = '';
					var group_checked = $('input[name=delete_group]:checked');
					for(var index=0;index< group_checked.length;index++){
						if(index != 0){
							id_list += ',{"id":"'+group_checked[index].value+'"}';
						}else{
							id_list += '{"id":"'+group_checked[index].value+'"}';
						}
					}
					
					if(id_list.length>0){
						$.ajax({
							url:'/api/v1/ssd/delete_group',
							type:'post',
							data:'{"id_list":['+id_list+']}',
							contentType:'application/json',
							success:function(data){
								console.log(data)
								if(data.status==10000){
									$.alert({
										title: '提示',
										type:'orange',
										content: '删除成功',
										onClose:function(){
											window.location.reload();
										}
									});
									
								}else{
									$.alert({
									title: '提示',
									type:'orange',
									content: '请求失败，请重试'
									});
								}
							},
							error:function(){
								alert('error');
							}
						})
					} else {
						 $.alert({
								title: '提示',
								type:'orange',
								content: '请选择分组'
							});
					}
                }
            },
            formCancel:{
                text:'取消',
                action: function () {
                    //close
                }
            }
        }

    });

    
    
});

function get_checked(checkbox){
	
	var count = 0;
    var checkArry = $(checkbox);
	var check_val = [];
    for (var i = 0; i < checkArry.length; i++) {
        if(checkArry[i].checked){
            check_val.push(checkArry[i].value);
        }
    }
	console.log(check_val);
    if( check_val.length == 0 ){
        $.alert({
            title: '提示',
            type:'orange',
            content: '请选择'
        });
		
    }else{
		
		var id_list = '';
		for(var i in check_val){
			if(i!=0){
				id_list+=','
			}
			id_list+='{"id":"'+check_val[i]+'"}'
		}
		return id_list;
	}
}

$('.deletehost').click(function(){
    var id_list = get_checked(".group li input[type=checkbox]");
	if(id_list){
		$.confirm({
            title: '删除主机',
            type:'blue',
            content:'是否删除主机？',
            onContentReady: function () {
            },
            buttons: {
                formSubmit: {
                    text: '确定',
                    btnClass: 'btn-blue',
                    action: function () {
						$.ajax({
							type: 'post',
							url: '/api/v1/ssd/deletehost',
							data:'{"id_list":['+id_list+']}',
							contentType:'application/json',
							success:function(data){
								
								if(data.status==10000){
									$.alert({
										title: '提示',
										type:'orange',
										content: '删除成功',
										onClose:function(){
											window.location.reload();
										}
									});
									
								}else{
									$.alert({
									title: '提示',
									type:'orange',
									content: '请求失败，请重试'
								});
								}
							},
							error:function(){
								$.alert({
									title: '提示',
									type:'orange',
									content: '请求超时，请重试'
								});
							}
						})
					}
                },
                formCancel:{
                    text:'取消',
                    action: function () {
                        //close
                    }
                }
            }

        });
	}
});



$('.removehost').click(function(){

    var id_list = get_checked(".group li input[type=checkbox]");
	if(id_list){
	
		var removehosthtml='';
		$.ajax({
			type: 'post',
			async:false,
			url: '/api/v1/ssd/initgroup',
			contentType:'application/json',
			success:function(data){
				removehosthtml+='<div><select id="host_moveto_group" class="groups form-control">';
				var group_list = data.group_list;
				var idx = 0;
				for(var index in group_list){	
					removehosthtml += '<option value="'+group_list[index].group_id+'">'+group_list[index].group_name+'</option>';
				}
				removehosthtml+='</select></div>';
			}
		})


        $.confirm({
            title: '移动到',
            type:'blue',
            content:removehosthtml,
            onContentReady: function () {
            },
            buttons: {
                formSubmit: {
                    text: '确定',
                    btnClass: 'btn-blue',
                    action: function () {
                       console.log('{"id_list":['+id_list+'],"old_id":"'+$('#old_group_id').val()+'","new_id":"'+$('#host_moveto_group').val()+'"}')
						$.ajax({
							type: 'post',
							url: '/api/v1/ssd/moveto_group',
							data:'{"id_list":['+id_list+'],"old_id":"'+$('#old_group_id').val()+'","new_id":"'+$('#host_moveto_group').val()+'"}',
							contentType:'application/json',
							success:function(data){
								console.log(data)
								if(data.status==10000){
									$.alert({
										title: '提示',
										type:'orange',
										content: '移动成功',
										onClose:function(){
											window.location.reload();
										}
									});
									
								}else{
									$.alert({
									title: '提示',
									type:'orange',
									content: '请求失败，请重试'
								});
								}
							},
							error:function(){
								$.alert({
									title: '提示',
									type:'orange',
									content: '请求超时，请重试'
								});
							}
						})
					}
                },
                formCancel:{
                    text:'取消',
                    action: function () {
                        //close
                    }
                }
            }

        });


    }

});

$('.configure').change(function(){
	
	$.ajax({
		url:'/api/v1/ssd/config_time',
		type:'post',
		data:'{"config_time":"'+$('.configure option:selected').text()+'"}',
		contentType:'application/json',
		success:function(data){
			$.alert({
				title: '提示',
				type:'orange',
				content: '修改成功'
			});
			localStorage.setItem("refresh_time", $('.configure option:selected').val());
		},
		error:function(){
			$.alert({
				title: '提示',
				type:'orange',
				content: '请求超时，请重试'
			});
		}
	})
});


function group_ip_list(id){
    $.ajax({
		type: 'post',
		url: '/api/v1/ssd/grouplist',
		data: '{"id":"'+id+'"}',
		contentType:'application/json',
		success:function(grouplist){
			console.log(grouplist)
			var groupdata = grouplist.data;
			var pageSize = 10;
			if(groupdata.length==0){
				$('.group'+0).html('<h4 align="center">暂无相关信息<h4>')
				$('#hostpage').html('')
				return;
			}
			$('#hostpage').bootstrapPaginator({
				currentPage: 1,//当前的请求页面。
				totalPages: groupdata.length%pageSize==0?groupdata.length/pageSize:groupdata.length/pageSize+1,//一共多少页。
				size:"normal",//应该是页眉的大小。
				bootstrapMajorVersion: 3,//bootstrap的版本要求。
				alignment:"right",
				numberOfPages:pageSize,//一页列出多少数据。
				shouldShowPage:true,
				itemTexts: function (type, page, current) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
					switch (type) {
					case "first": return "首页";
					case "prev": return "上一页";
					case "next": return "下一页";
					case "last": return "末页";
					case "page": return page;
					}
				},
				onPageClicked: function (event, originalEvent, type, page){//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
					
					var pageContent = '';
					for(var index=(page-1)*pageSize;index<(page*pageSize>groupdata.length?groupdata.length:page*pageSize);index++){
						pageContent += '<li class="col-xs-2" style="margin-right:30px"><input type="checkbox" value="'+groupdata[index].id+'"><span hostid="'+groupdata[index].id+'">'+groupdata[index].ip+'</span></li>';;
					}
					
					$('.group'+0).html(pageContent);
				}
			}) 
			$('#old_group_id').val(id)
			$('.group').on("click","li span",function(){
				$(this).addClass('active').parent('li').siblings().find('span').removeClass("active");
				console.log($(this).prev().val());
				ip_info($(this).prev().val());
				 host = $(".hostInformation").height();
				 	var h = $(window).height();
	var host = $(".hostInformation").height();
	var end = (h-host-168.6) + "px";
	console.log(host);
	console.log(end);
   $(".monitor").height(end);
				console.log(host);
			});
			$('#hostpage .active a').click()
			$('.group0 li span').eq(0).click();
		}
	});
}

function group_init(){
	//initgroup
	$.ajax({
		type: 'post',
		url: '/api/v1/ssd/initgroup',
		
		contentType:'application/json',
		success:function(data){
			var groups = '';
			var group_list = data.group_list;
			
			for(var index in group_list){	
				groups += '<li value='+group_list[index].group_id+' class="col-xs-2"><a href="javascript:void(0)" data-toggle="tab" style="float:left;display:block" >'+group_list[index].group_name+'</a><span class="glyphicon glyphicon-edit rename" style="line-height: 40px;"></span></li>';	
				if((parseInt(index)+1)%6==0){console.log(index);groups += '<div style="clear:both"/>'}
			}
			$('.tabbable .grouptitle').html(groups)
			$('.tabbable .grouptitle li a').click(function(){
				group_ip_list($(this).parent().val())
			})			
			
			$('.tabbable .grouptitle li a').eq(0).click();

			var renamehtml = '';
			renamehtml += '<label>重命名为：<input type="text" id="group_name_new" class="form-control" placeholder="请输入新的分组名称" style="display: inline-block;width: auto"></label>';
			$('.rename').on('click',function(){
				var that = $(this);
				$.confirm({
					title: '重命名',
					type:'blue',
					content:renamehtml,
					onContentReady: function () {
					},
					buttons: {
						formSubmit: {
							text: '确定',
							btnClass: 'btn-blue',
							action: function () {
								$.ajax({
									url:'/api/v1/ssd/rename',
									type:'post',
									data:'{"id":"'+$(that).parent().val()+'","name":"'+$("#group_name_new").val()+'"}',
									contentType:'application/json',
									success:function(data){
										console.log(data)
										if(data.status==10000){
											$.alert({
												title: '提示',
												type:'orange',
												content: '重命名成功',
												onClose:function(){
													window.location.reload();
												}
											});
											
										}else{
											$.alert({
											title: '提示',
											type:'orange',
											content: '请求失败，请重试'
										});
										}
									},
									error:function(){
										$.alert({
											title: '提示',
											type:'orange',
											content: '请求超时，请重试'
										});
									}
								})
							}
						},
						formCancel:{
							text:'取消',
							action: function () {
								//close
							}
						}
					}

				});
			});			
		}
	});
	
}
	


function initgroups(){
    group_init()
	
}


function ip_info(id){
	$.ajax({
			type: 'post',
			url: '/api/v1/ssd/init_ipinfo',
			data: '{"id":"'+id+'"}',
			contentType:'application/json',
			success:function(data){
				$('.monitorinformation').empty();
				$('.basicinformation').empty();
				    console.log(data)
					var basicinformation ='';
					if(data.card_info != null){
					var sub_info = data.card_info.substring(1,data.card_info.length-1);
					
					var bb = sub_info.split(",");
					var nn = '';
					for (i=0;i<bb.length ;i++ ) 
						{ 
							nn += '<a href="#" class="card_index" style="margin-left: 10px;">'+bb[i]+'<a/>';
					} 
					basicinformation += '<tr><td>主机</td><td>'+data.ip+'</td></tr><tr><td>卡信息</td><td>'+nn+'</td></tr><tr><td>报警数</td><td style="color: #ff0000;">'+data.error_num+'</td></tr>';
					}else if(data.card_info == null){
						basicinformation += '<tr><td>主机</td><td>'+data.ip+'</td></tr><tr><td>卡信息</td><td>'+0+'</td></tr><tr><td>报警数</td><td style="color: #ff0000;">'+data.error_num+'</td></tr>';
					}
					var monitorinformation = '';
					for(var index in data.monitor_data){
						if(data.monitor_data[index].state == 'danger'){
							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td style="color: #ff0000;">'+data.monitor_data[index].state+'</td></tr>';
						}else if(data.monitor_data[index].state == 'normal'){
							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td style="color: #009f3c;">'+data.monitor_data[index].state+'</td></tr>';
						}else if(data.monitor_data[index].state == 'normal'){
							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td style="color: #747272;">'+data.monitor_data[index].state+'</td></tr>';
						}else{
							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td>'+data.monitor_data[index].state+'</td></tr>';
						}
						
					}
					if(monitorinformation==''){
						$('.monitorinformation').html('<tr><td colspan="5"><h4>暂无相关信息</h4></td></tr>');
					}else{
						$('.monitorinformation').html(monitorinformation);
					}
					$('.basicinformation').html(basicinformation);
					filter01(id);
			}
		});
		
}

//4月26日修改代码
function filter01(id){
	$(".card_index").click(function(){
      var mm =	$(this).text();
      $.ajax({
			type: 'post',
			url: '/api/v1/ssd/monitorinfobycard',
			data: '{"id":"'+id+'","card":"'+mm+'"}',
			contentType:'application/json',
			success:function(data){
				  $('.monitorinformation').empty();
					var monitorinformation_02 = '';
					for(var index in data.data){
						
							if(data.data[index].state == 'none'){
							monitorinformation_02 += '<tr><td>'+data.data[index].card+'</td><td>'+data.data[index].monitoritem+'</td><td>'+data.data[index].threshold+'</td><td>'+data.data[index].value+'</td><td style="color: #ff0000;">'+data.data[index].state+'</td></tr>';
						}else{
							monitorinformation_02 += '<tr><td>'+data.data[index].card+'</td><td>'+data.data[index].monitoritem+'</td><td>'+data.data[index].threshold+'</td><td>'+data.data[index].value+'</td><td>'+data.data[index].state+'</td></tr>';
						}
						
						
					}
					if(monitorinformation_02==''){
						$('.monitorinformation').html('<tr><td colspan="4"><h4>暂无相关信息</h4></td></tr>');
					}else{
						$('.monitorinformation').html(monitorinformation_02);
					}
					
			}
		});
      
})
}






function host_search(){
	
		var ip = $("#search_host").val();
		var ip_regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
		var mask = $("#search_host_mask").val();
		var mask_regex = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
		var search_flag = false;
		if(ip_regex.test(ip) && mask_regex.test(mask)){
			search_flag = true;
		}
		if(search_flag){
		$.ajax({
			type: 'post',
			url: '/api/v1/ssd/search',
			data: '{"host":"'+ip+'","mask":"'+mask+'"}',
			contentType:'application/json',
			success:function(data){
				$('.monitorinformation').empty();
				$('.basicinformation').empty();
				   var basicinformation_02 ='';
					if(data.card_info != null){
					var sub_info = data.card_info.substring(1,data.card_info.length-1);
					
					var bb = sub_info.split(",");
					var nn = '';
					for (i=0;i<bb.length ;i++ ) 
						{ 
							nn += '<a href="#" class="card_index" style="margin-left: 10px;">'+bb[i]+'<a/>';
					} 
					basicinformation_02 += '<tr><td>主机</td><td>'+data.ip+'</td></tr><tr><td>卡信息</td><td>'+nn+'</td></tr><tr><td>报警数</td><td style="color: #ff0000;">'+data.error_num+'</td></tr>';
					}else if(data.card_info == null){
						basicinformation_02 += '<tr><td>主机</td><td>'+data.ip+'</td></tr><tr><td>卡信息</td><td>'+0+'</td></tr><tr><td>报警数</td><td style="color: #ff0000;">'+data.error_num+'</td></tr>';
					}
						var monitorinformation_02 = '';
					for(var index in data.monitor_data){
						if(data.monitor_data[index].state == 'danger'){
							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td style="color: #ff0000;">'+data.monitor_data[index].state+'</td></tr>';
						}else if(data.monitor_data[index].state == 'normal'){
							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td style="color: #009f3c;">'+data.monitor_data[index].state+'</td></tr>';
						}else if(data.monitor_data[index].state == 'normal'){
							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td style="color: #747272;">'+data.monitor_data[index].state+'</td></tr>';
						}else{
							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td>'+data.monitor_data[index].state+'</td></tr>';
						}
						
					}
					if(monitorinformation_02==''){
						$('.monitorinformation').html('<tr><td colspan="5"><h4>暂无相关信息</h4></td></tr>');
					}else{
						$('.monitorinformation').html(monitorinformation_02);
					}
					$('.basicinformation').html(basicinformation_02);
					
			}
		})
	} else{
		$.alert({
			title: '提示',
			type:'orange',
			content: 'ip或mask格式不对，请检查'
		});
	}
}

$('.master-install .glyphicon-search').click(function(e){
		host_search();
	}
)
$('#search_host').keypress(function(e) {  
        if (e.keyCode == 13) {
			host_search();
		}
	}
)
$('#search_host_mask').keypress(function(e) {  
        if (e.keyCode == 13) {
			host_search();
		}
	}
)
/*****************warn******************/

function warninformation(){

	warning_msg('/api/v1/ssd/warning','')
}

function warning_by_item(item){
	
	warning_msg('/api/v1/ssd/warning_by_item','{"monitor_item":"'+item+'"}')
}

function warning_msg(url,data){
	
	var warninformation = [];
	var pageSize = 10;
	$.ajax({
		type: 'post',
		url: url,
		data:data,
		contentType:'application/json',
		success:function(warningdata){
			if(warningdata.data.length==0){
				$.alert({
				title: '提示',
				type:'orange',
				content: '暂无此项数据'
				});
				return;
			}
			for(var index in warningdata.data){
				if(warningdata.data[index].operate_state=='on'){
					warninformation.push('<tr><td>'+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].warn_level+'</td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
				}else{
					warninformation.push('<tr><td>'+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].warn_level+'</td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch"/><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
				}
			}
			
			$('#page1').bootstrapPaginator({
				currentPage: 1,//当前的请求页面。
				totalPages: warningdata.data.length%10==0?warningdata.data.length/10:warningdata.data.length/10+1,//一共多少页。
				size:"normal",//应该是页眉的大小。
				bootstrapMajorVersion: 3,//bootstrap的版本要求。
				alignment:"right",
				numberOfPages:pageSize,//一页列出多少数据。
				shouldShowPage:true,
				itemTexts: function (type, page, current) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
					switch (type) {
					case "first": return "首页";
					case "prev": return "上一页";
					case "next": return "下一页";
					case "last": return "末页";
					case "page": return page;
					}
				},
				onPageClicked: function (event, originalEvent, type, page){//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
					
					var pageContent = '';
					for(var index=(page-1)*pageSize;index<(page*pageSize>warninformation.length?warninformation.length:page*pageSize);index++){
						pageContent += warninformation[index];
					}
					$('.warninformation').html(pageContent);
					
					$('.mySwitch').bootstrapSwitch({  
							onText:"ON",  
							offText:"OFF",  
							onColor:"info",  
							offColor:"default",  
							size:"small",  
							onSwitchChange:function(event,state){ 
								var state_value='';
								if(state==true){  
									state_value='on';
								}else{
									state_value='off';
							   }  
							   $.ajax({
									type: 'post',
									url: '/api/v1/ssd/operate_state',
									data:'{"warn_id":"'+$(this).parent().parent().next().val()+'","operate_state":"'+state_value+'"}',
									contentType:'application/json',
								    success:function(data){
										console.log(data)
										if(data.status==10000){
											$.alert({
												title: '提示',
												type:'orange',
												content: '修改成功',
												onClose:function(){
													window.location.reload();
												}
											});
											
										}else{
											$.alert({
											title: '提示',
											type:'orange',
											content: '请求失败，请重试'
										});
										}
									},
									error:function(){
										$.alert({
											title: '提示',
											type:'orange',
											content: '请求超时，请重试'
										});
									}
							   })
						  }  
					})
				}
			});
			$('#page1 .active a').click()
		}
	});
}

$(".monitorbtn").click(function(){
    $('.monitordiv').show();
});
$(".monitordiv li").click(function(){
    $('.monitordiv').hide();
    //alert($(this).html());
    warning_by_item($(this).html())
});
function init_refresh(){
	//console.log(1)
    initgroups();
    //hostinfo();
    //monitorinfo();
    //search_host();
//  warninformation();
    //warning_by_item()
    
}
$('body').append('<input type="hidden" id="old_group_id"/>')
$(function(){
	init_refresh()
	// $('.group li').eq(0).find('span').addClass('active');
	// $('.grouptitle li a').eq(0).click();
	// console.log($('.grouptitle li a').eq(0))
	console.log(localStorage.getItem('refresh_time'))
	if(localStorage.getItem('refresh_time')){
		window.setInterval('init_refresh()',localStorage.getItem('refresh_time'))
	}
});


