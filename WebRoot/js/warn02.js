




/************************首页***********************************************************************************/
//【addhost添加主机】【loadin_add()导入添加】【nomal_add()正常添加】
$(".addhost").click(function(){
    
	
	$.confirm({
    title: '添加主机',
    content: '选择一个添加主机的方式',
	                buttons: {
                    load: {
                        text: "导入文件",
                        btnClass: 'btn-primary',
                        keys: ['enter'],
                        action: function(){
                            
							loadin_add();

                        }
                    },
					create: {
                        text: "新建主机",
                        btnClass: 'btn-primary',
                        keys: ['other'],
                        action: function(){
                            nomal_add();

                        }
                    },
                    cancel: {
                        text: "取消添加",
                        btnClass: 'btn-primary',
                        keys: ['esc'],
                        action:function () {
                            
                        }
					},
				},

              });
 });



function loadin_add(){
    var addhosthtml = '';	

	//addhosthtml += '<div class="right" style="background: url(img/timg.jpg) no-repeat; background-size: cover;width:400px;height:400px;margin-top: 52px;">';

    addhosthtml += '<div class="addhosts">';

	//addhosthtml += '<p class="initialtitle" style="font-size:18px;font-family: "微软雅黑";">是否添加主机  (如果无需添加主机   请直接点击"开始监控"按钮即可)</p><h4 style="margin-left: 20px;">请选择主机信息文件:</h4>';

	addhosthtml += '<form id="form1" method="post" action="/api/v1/ssd/quick_add_host" enctype="multipart/form-data" target="framFile">';

	addhosthtml += '<div class="form-group"><div class="col-sm-5 col-sm-offset-2"><input id="File1" data-toggle="tooltip" data-placement="top" title="文件类型是xlsx格式,例如host.xlsx"  class="btn btn-default" type="file" name="myfile"/></div></div>';

	addhosthtml += '<div class="form-group"><div class="col-sm-3 col-sm-offset-2"><input type="submit" id="hostupload"  class="btn btn-primary" value="提交" style="background: #3bb7f5;border:1px solid #3bb7f5;"/></div></div>';

	addhosthtml += '</form>';

	addhosthtml += '<iframe id="framFile" name="framFile" style="display:none;"></iframe>';
	
	addhosthtml += '<br/><br/><br/></form>';
	
	addhosthtml += '</div><script src="js/jquery.form.js" type="text/javascript" charset="utf-8"></script><script src="js/host-validator.js"></script><script src="js/initial.js"></script>';
	
	
	$.confirm({
    title: '添加主机',
	theme: 'my-theme',
    content: addhosthtml,
	buttons: {
 
            formCancel:{

                text:'关闭',

                action: function () {}

                        }

        }
	});
	
	
	
};
function nomal_add(){

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
	
	//2018.05.16
	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="port" id="port" placeholder="请输入port"></div>';

	addhosthtml += '</div>';

	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="ip_name" class="col-sm-2 control-label">hostname:</label>';
	
	//2018.05.16
	

	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="hostname" id="hostname" placeholder="请输入hostname"></div>';

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
           
			$('#host_add_form').bootstrapValidator({  
                
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

						console.log('{"ip":"'+$('#ip').val()+'","hostname":"'+$('#hostname').val()+'","mask":"'+$("#mask").val()+'","port":"'+$("#port").val()+'","username":"'+$("#username").val()+'","password":"'+$("#password").val()+'","group_id":"'+$("#group_id").val()+'"}')

						$.ajax({

							url:'/api/v1/ssd/insert_host',

							type:'post',

							data:'{"ip":"'+$('#ip').val()+'","hostname":"'+$('#hostname').val()+'","mask":"'+$("#mask").val()+'","port":"'+$("#port").val()+'","username":"'+$("#username").val()+'","password":"'+$("#password").val()+'","group_id":"'+$("#group_id").val()+'"}',

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

};

//【addgroup添加分组】->【add_group()分组函数】

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





//【deletegroup删除组】

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


//【table左边】->【checked方框】
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


//【deletehost删除主机】
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

				$('.group'+0).html('<p align="left">暂无相关信息<p>')

				$('#hostpage').html('')

				return;

			}

			var pageContent = '';

					for(var index=0; index<groupdata.length ;index++){

						pageContent += '<li style="position:relative;width: 260px;margin-left:10px; "><input type="checkbox" value="'+groupdata[index].id+'"><span id="s'+index+'" hostid="'+groupdata[index].id+'">'+" "+groupdata[index].hostname+" | "+groupdata[index].ip+'</span></li>';;
				}

					$('.group'+id).html(pageContent);

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

				groups += '<li value='+group_list[index].group_id+' ><a href="javascript:void(0)"  data-toggle="tab" style="font-family: verdana;color:black;font-size:1.5rem;font-weight: bold;" ><span style="float:left;" class="glyphicon glyphicon-plus-sign"></span>'+group_list[index].group_name+'</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="glyphicon glyphicon-edit rename" style="line-height: 1.5rem;"></span><div><ul class="group group'+group_list[index].group_id+'"></ul></div></li>';	

				if((parseInt(index)+1)%6==0){console.log(index);groups += '<div style="clear:both"/>'}

			}

			$('.tabbable .grouptitle').html(groups)
			
            
			$('.tabbable .grouptitle li a').click(function(){
                
				//判断标签是否为空，来决定展开收回
				if($(".group"+$(this).parent().val()+"").is(":empty")){
				
				
				group_ip_list($(this).parent().val());
                
				 }
				
				else{
			    $(".group"+$(this).parent().val()+"").empty();
				
			     }			
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

	
//【initgroups初始化组】->【group_init()生成组ul】->【group_ip_list(id)生产ip ul】
function initgroups(){

    group_init()

	

}



//首页---报警信息

function ip_info(id){
    global_flash_id = id;
	
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

					basicinformation += '<tr><td>主机</td><td>'+data.hostname+'&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp'+data.ip+'</td></tr><tr><td>卡信息</td><td>'+nn+'</td></tr><tr><td>报警数</td><td style="color: #ff0000;">'+data.error_num+'</td></tr>';

					}else if(data.card_info == null){

						basicinformation += '<tr><td>主机</td><td>'+data.hostname+'&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp'+data.ip+'</td></tr><tr><td>卡信息</td><td>'+0+'</td></tr><tr><td>报警数</td><td style="color: #ff0000;">'+data.error_num+'</td></tr>';

					}

					var monitorinformation = '';

					for(var index in data.monitor_data){

						if(data.monitor_data[index].state == 'danger'){

							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/danger.png"></td></tr>';

						}else if(data.monitor_data[index].state == 'normal'){

							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/normal.png"></td></tr>';

						}else if(data.monitor_data[index].state == 'warning'){

							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/alarm.png"></td></tr>';

						}else{

							monitorinformation += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/normal.png"></td></tr>';

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

							monitorinformation_02 += '<tr><td>'+data.data[index].card+'</td><td>'+data.data[index].monitoritem+'</td><td>'+data.data[index].threshold+'</td><td>'+data.data[index].value+'</td><td><img src="ssd_img/alarm.png"></td></tr>';

						}else{

							monitorinformation_02 += '<tr><td>'+data.data[index].card+'</td><td>'+data.data[index].monitoritem+'</td><td>'+data.data[index].threshold+'</td><td>'+data.data[index].value+'</td><td><img src="ssd_img/normal.png"></td></tr>';

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



/*首页onload*/
function ssd_db_status(){

$.ajax({
				
				type: 'post',

				async:false,

				url: '/api/v1/ssd/select_apptime',

				contentType:'application/json',

				success:function(data){
				       var db = data.status;
					   var db_02 = data.msg;
					 
					   if(db != "10000"){alert("取值失败！"+db_02+"");}
					   
					   }
})
};

/***********************配置页*******************************************************************/
//2018.05.17添加----------------load传入数据
//配置页修改按钮   弹框编写2018.05.21   

$(".addhostseem").click(function(){


    var a=$("input[ name='submit_v' ]:checked").attr("data-04");

	if(a == null){alert("未选择，不能修改！");}
	else{
	//数值判断，只有数值才可修改
             if(isNaN(parseInt(a,10))){
	         alert("非数值，不能修改！");
	}
	
	
	else{
	
	var addhosthtml = '';	

	addhosthtml += '<div class="addhosts" >';

	addhosthtml += '<form role="form" id="change_form">';
	
	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="ip" class="col-sm-2 control-label">名称:</label>';

	addhosthtml += '<div class="col-sm-10"><label for="ip" style="width: 36.66666667%" class="col-sm-2 control-label">'+$("input[ name='submit_v' ]:checked").attr("value")+'</label></div>';

	addhosthtml += '</div>';


	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="ip" class="col-sm-2 control-label">警报值:</label>';

	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="warning" id="warning" placeholder="请输入警报值"></div>';

	addhosthtml += '</div>';

	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="mask" class="col-sm-2 control-label">危险值:</label>';

	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="danger" id="danger" placeholder="请输入危险值"></div>';

	addhosthtml += '</div>';

	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="port" class="col-sm-2 control-label">描述:</label>';
	
	//2018.05.16
	addhosthtml += '<div class="col-sm-10"><label for="ip" style="width: 76.66666667%" class="col-sm-2 control-label">'+$("input[ name='submit_v' ]:checked").attr("data-02")+'</label></div>';

	addhosthtml += '</div>';


	addhosthtml += '<div class="col-sm-1 col-md-1">';

	addhosthtml += '<button class="btn btn-default initialaddgroup">确认</button>';

	addhosthtml += '</div>';

	addhosthtml += '</div>';

	addhosthtml += '</div>';

	

	

    $.confirm({

        title: '配置',

        type:'blue',

        content:addhosthtml,

        onContentReady: function () {

         
			$('.initialaddgroup').click(add_group);

			$('form').bootstrapValidator({  

				message: '校验未通过',  

				feedbackIcons: {  

					valid: 'glyphicon glyphicon-ok',  

					invalid: 'glyphicon glyphicon-remove',  

					validating: 'glyphicon glyphicon-refresh'  

				},  

				fields: {  

					warning: {  

						validators: {  

							notEmpty: {  

								message: 'warning不能为空'  

							},  

							between: {  

								min:0,

								max:65535,

								message:'port必须在0-65535之间'

							}  

						}  

					}, 
					
					danger: {  

						validators: {  

							notEmpty: {  

								message: 'danger不能为空'  

							},  

							between: {  

								min:0,

								max:65535,

								message:'port必须在0-65535之间'

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

					var bootstrapValidator = $("#change_form").data('bootstrapValidator');

					bootstrapValidator.validate();

					if(bootstrapValidator.isValid()){

						

						

						console.log('{"id":"'+$("input[ name='submit_v' ]:checked").attr("data-03")+'","warning":"'+$("#warning").val()+'","danger":"'+$("#danger").val()+'"}')

						$.ajax({

							url:'/api/v1/ssd/change_config',

							type:'post',

							data:'{"id":"'+$("input[ name='submit_v' ]:checked").attr("data-03")+'","warning":"'+$("#warning").val()+'","danger":"'+$("#danger").val()+'"}',

							contentType:'application/json',
							

							success:function(data){
							   

								if(data.status==10000){

									$.alert({

										title: '提示',

										type:'orange',
/*测试--完后删除*/
										content: '添加成功'+$("input[ name='submit_v' ]:checked").attr("data-03")+$("#warning").val()+$("#danger").val(),

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
};
}
});

//配置页两个表格 【filter02】【filter03】  03里直接添加的按钮修改配置
function filter02(){
			

			var grouphtml='';

			$.ajax({
				
				type: 'post',

				async:false,

				url: '/api/v1/ssd/select_config',

				contentType:'application/json',

				success:function(data){

					//grouphtml+='<select id="group_id" class="groups form-control">';
					 $('.monitorinfor').empty();
                     
					var group_list = data.data;
					
					

					for(var index in group_list){	
                        
						
						
						grouphtml += '<tr><td><input name="submit_v" type="radio" data-04="'+group_list[index].threshold+'" data-03="'+group_list[index].id+'" data-02="'+group_list[index].description+'" value="'+group_list[index].monitor_zh+'" /></td><td>'+group_list[index].monitor_zh+'</td><td>'+group_list[index].threshold+'</td><td>'+group_list[index].warning+'</td><td>'+group_list[index].danger+'</td><td>'+group_list[index].description+'</td></tr>';

					}

					if(grouphtml==''){

						$('.monitorinfor').html('<tr><td colspan="4"><h4>暂无相关信b息'+data.data+'</h4></td></tr>');

					}else{

						$('.monitorinfor').html(grouphtml);

					}

				}

			});
}
function filter03(){
			

			var grouphtml='';

			$.ajax({
				
				type: 'post',

				async:false,

				url: '/api/v1/ssd/select_apptime',

				contentType:'application/json',

				success:function(data){

				
					 $('.monitorinfor2').empty();
                     
					var group_list = data.data;
                    
					for(var index in group_list){
                    			
                        change_config_time = group_list[0].id;
						grouphtml += '<tr><td><div><button class="addhostseem02 but" style="background-color:#a0dfff;">轮询设置</button></div></td><td>轮询时间</td><td>'+group_list[index].app_time_hour+'</td><td>'+group_list[index].app_time_minute+'</td><td>'+group_list[index].app_time_second+'</td><td>'+group_list[index].config_time+'(分钟)'+'</td><td id="about_data">小时、分钟、秒合成一个时间作为后台主机轮询时间</td></tr>';

					}

					if(grouphtml==''){

						$('.monitorinfor2').html('<tr><td colspan="4"><h4>暂无相关信b息'+data.data+'</h4></td></tr>');

					}else{

						$('.monitorinfor2').html(grouphtml);

					}
					
					
					
//修改轮询2018.05.21

$(".addhostseem02").click(function(){
     
	var addhosthtml = '';	

	addhosthtml += '<div class="addhosts" >';

	addhosthtml += '<form role="form" id="change_form">';
	
	


	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="hour" class="col-sm-2 control-label">时间:</label>';

	addhosthtml += '<div class="col-sm-10" style="float:left;"><input style="width:20%;float:left;" type="text" class="form-control" name="hour" id="hour" placeholder="请输入小时"><span style="float:left;"> 时 </span>';

	//addhosthtml += '</div>';
	
	
	
	//addhosthtml += '<div class="form-group">';

	//addhosthtml += '<label for="ip" class="col-sm-2 control-label">分钟:</label>';

	addhosthtml += '<input style="width:20%;float:left;" type="text" class="form-control" name="minute" id="minute" placeholder="请输入分钟"><span style="float:left;"> 分 </span>';

	//addhosthtml += '</div>';
	

	//addhosthtml += '<div class="form-group">';

	//addhosthtml += '<label for="mask" class="col-sm-2 control-label">秒:</label>';

	addhosthtml += '<input style="width:20%;float:left;" type="text" class="form-control" name="second" id="second" placeholder="请输入秒"><span> 秒</span></div>';

	addhosthtml += '</div>';
	
	
	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="config_time" class="col-sm-2 control-label">前台刷新时间</label>';

	addhosthtml += '<div class="col-sm-10"><input type="text" class="form-control" name="config_time" id="config_time" placeholder="默认分钟"></div>';

	addhosthtml += '</div>';
	
    
	addhosthtml += '<div class="form-group">';

	addhosthtml += '<label for="mask" class="col-sm-2 control-label">描述:</label>';

	addhosthtml += '<div class="col-sm-10"><label for="mask" style="width:70%" class="col-sm-2 control-label">'+document.getElementById("about_data").innerText+'</label></div>';

	addhosthtml += '</div>';
	


	addhosthtml += '<div class="col-sm-1 col-md-1">';

	addhosthtml += '<button class="btn btn-default initialaddgroup">确认</button>';

	addhosthtml += '</div>';

	addhosthtml += '</div>';

	addhosthtml += '</div>';

	

	
    
    $.confirm({

        title: '轮询时间配置',

        type:'blue',

        content:addhosthtml,

        onContentReady: function () {

         
			

			$('form').bootstrapValidator({  

				message: '校验未通过',  

				feedbackIcons: {  

					valid: 'glyphicon glyphicon-ok',  

					invalid: 'glyphicon glyphicon-remove',  

					validating: 'glyphicon glyphicon-refresh'  

				},  

				fields: {  

					hour: {  

						validators: {  

							notEmpty: {  

								message: '小时不能为空'  

							},  

							between: {  

								min:0,

								max:24,

								message:'小时必须在0-24之间'

							}  

						}  

					}, 
					minute: {  

						validators: {  

							notEmpty: {  

								message: '分钟不能为空'  

							},  

							between: {  

								min:0,

								max:59,

								message:'分钟必须在0-59之间'

							}  

						}  

					}, 
					second: {  

						validators: {  

							notEmpty: {  

								message: '秒不能为空'  

							},  

							between: {  

								min:0,

								max:59,

								message:'秒必须在0-59之间'

							}  

						}  

					}, 
					config_time: {  

						validators: {  

							notEmpty: {  

								message: '前台轮询时间不能为空'  

							},  

							between: {  

								min:0,

								max:65535,

								message:'必须在0-65535之间'

							}  

						}  

					}, 
					
					danger: {  

						validators: {  

							notEmpty: {  

								message: 'danger不能为空'  

							},  

							between: {  

								min:0,

								max:65535,

								message:'danger必须在0-65535之间'

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

					var bootstrapValidator = $("#change_form").data('bootstrapValidator');

					bootstrapValidator.validate();

					if(bootstrapValidator.isValid()){

						

						

						console.log('{"id":"50990","hour":"'+$("#hour").val()+'","minute":"'+$("#minute").val()+'","second":"'+$("#second").val()+'","config_time":"'+$("#config_time").val()+'"}')

						$.ajax({

							url:'/api/v1/ssd/change_apptime',

							type:'post',

							data:'{"id":"'+change_config_time+'","hour":"'+$("#hour").val()+'","minute":"'+$("#minute").val()+'","second":"'+$("#second").val()+'","config_time":"'+$("#config_time").val()+'"}',
							
							contentType:'application/json',
							

							success:function(data){
							    

								if(data.status==10000){

									$.alert({

										title: '提示',

										type:'orange',
/*测试--完后删除*/
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

				}

			});
			
			
}

/**^^^^^^^^^^^^^^^^^^^^^^^^^^^配置页^^^^^^^^^^^^^^^^^^^^^^^^^************************************/


















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

							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/danger.png"></td></tr>';

						}else if(data.monitor_data[index].state == 'normal'){

							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/normal.png"></td></tr>';

						}else if(data.monitor_data[index].state == 'warning'){

							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/alarm.png"></td></tr>';

						}else{

							monitorinformation_02 += '<tr><td>'+data.monitor_data[index].card+'</td><td>'+data.monitor_data[index].monitoritem+'</td><td>'+data.monitor_data[index].threshold+'</td><td>'+data.monitor_data[index].value+'</td><td><img src="ssd_img/normal.png"></td></tr>';

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
$('.search_button').click(function(e){

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



	warning_msg2('/api/v1/ssd/warning','')

}
//2018.05.22 add-start报警页，加载即显示

function warning_msg2(url,data){

	
    
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
				       if(warningdata.data[index].warn_level == "danger"){

					        warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td><img src="ssd_img/danger.png"></td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
                        }
				        else{
				            warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td><img src="ssd_img/alarm.png"></td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
                   
				        }
				   
				}else{

					warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td><img src="ssd_img/danger.png"></td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');

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



//2018.05.22 add-end

function warning_by_item(item){

	

	warning_msg('/api/v1/ssd/warning_by_item','{"monitor_item":"'+item+'"}')

}
/*2018.05.18--start*/
function warning_by_item2(item){

	

	warning_msg('/api/v1/ssd/warning_by_level','{"monitor_level":"'+item+'"}')

}


/*2018.05.18--end*/
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
				       if(warningdata.data[index].warn_level == "danger"){

					        warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td><img src="ssd_img/danger.png"></td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
                        }
				        else{
				            warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td><img src="ssd_img/alarm.png"></td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
                   
				        }
				   
				}else{

					warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td><img src="ssd_img/danger.png"></td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');

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



/********首页search框框

$("#search_key").click(function(){
    var search_val = $("input[name='crid']").val();
	//alert(search_val);
	


});

***********/


/*********************筛选按钮*******************************/
$(".monitorbtn").click(function(){

    $('.monitordiv').toggle();


});

$(".monitordiv li").click(function(){

    $('.monitordiv').hide();

    //alert($(this).html());

    warning_by_item($(this).html())

});
$(".monitorbtn2").click(function(){

    $('.monitordiv2').toggle();


});

$(".monitordiv2 li").click(function(){

    $('.monitordiv2').hide();

    //alert($(this).html());

    warning_by_item2($(this).html())

});

/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^筛选按钮-warn^^^^^^^^^^^^^*^^^^^^^^^^^^^*/


/*自适应高度，获取页面高度，赋值给标签样式by id*/
function backgroundSize(){
    var h = window.screen.height-460;
    document.getElementById("warn_size").style.height=""+h+"px";
	
    //alert("屏幕高度-350：" + h + "");
}
function groupSize(){
    var hh = window.screen.height-460;
    document.getElementById("group_size").style.height=""+hh+"px";
	
    //alert("屏幕高度-350：" + hh + "");
}
function tableSize(){
    var hhh = window.screen.height-530;
    document.getElementById("table_scroll").style.height=""+hhh+"px";
	
   // alert("屏幕高度-350：" + hhh + "");
}
/*自适应高度结束*/


function init_refresh(){

	//console.log(1)

    initgroups();

    //hostinfo();

    //monitorinfo();

    //search_host();

 warninformation();

    //warning_by_item()
	//backgroundSize();
    //groupSize();
    //tableSize();

}

//获取轮询时间
function get_change_time(){
            var local_var = 0 ;
			var local_hour = 0 ;
			var local_minute = 0 ;
			var local_second = 0 ;
			$.ajax({
				
				type: 'post',

				async:false,

				url: '/api/v1/ssd/select_apptime',

				contentType:'application/json',

				success:function(data){
                    var group_list_change = data.data;
					local_var = group_list_change[0].config_time;
					local_hour = group_list_change[0].app_time_hour;
					local_minute = group_list_change[0].app_time_minute;
					local_second = group_list_change[0].app_time_second;
					
					}
				});
            change_time = parseInt(local_var,10);
			var time_hour = parseInt(local_hour,10);
			var time_minute = parseInt(local_minute,10);
			var time_second = parseInt(local_second,10);
			globle_back_time = ((time_hour*60+time_minute)*60+time_second)*1000;
			
			change_time = change_time*1000*60;
};



//定时刷新
function startRequest(){
//alert("刷新");


warninformation();

}
//后台轮询时间
/*$.ajax({
				
				type: 'post',

				async:false,

				url: '/api/v1/ssd/db_operate',

				contentType:'application/json',

				success:function(data){
                    var status_mon = data.status;
					
					if(status_mon==10000){}
					else{alert("加载数据失败！");}
					
					
					}
				});*/
function redirect_fun(){
    setTimeout(function(){
	//console.log('s0前----------------------');
	if(global_flag_first==0){
        window.location.href='/initial.html';  	
		}
		}, 10000); 

   var red_html = '';	

	//addhosthtml += '<div class="right" style="background: url(img/timg.jpg) no-repeat; background-size: cover;width:400px;height:400px;margin-top: 52px;">';

    red_html += '<div>';

	//addhosthtml += '<p class="initialtitle" style="font-size:18px;font-family: "微软雅黑";">是否添加主机  (如果无需添加主机   请直接点击"开始监控"按钮即可)</p><h4 style="margin-left: 20px;">请选择主机信息文件:</h4>';

	red_html += '<p>请配置后台轮询时间，10秒后跳转至配置页面</p>';

	
	red_html += '</div>';
	
	
	$.confirm({
    title: '即将跳转页面...',
	type: 'blue',
    content: red_html,
	buttons: {
 
            formCancel:{

                text:'现在跳转',

                action: function () {window.location.href='/initial.html'}

                        }

        }
	});
	
	

};
function back_ask_time(){


             $.ajax({
				
				type: 'post',

				async:false,

				url: '/api/v1/ssd/select_number_to_db',

				contentType:'application/json',

				success:function(data){
                    var status_var = data.status;
					
					if(status_var==10000){}
					else{alert("加载数据失败！");}
					
					
					}
				});
				


}
$('body').append('<input type="hidden" id="old_group_id"/>')

$(function(){
    
    get_change_time();
	if(globle_back_time==0){
	redirect_fun();
	}
	else{init_refresh();}

    setInterval("startRequest()", change_time); 
	// $('.group li').eq(0).find('span').addClass('active');

	// $('.grouptitle li a').eq(0).click();

	// console.log($('.grouptitle li a').eq(0))

	

});




