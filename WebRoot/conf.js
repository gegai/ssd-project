

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

						$('.monitorinformation').html('<tr><td colspan="6"><h4>暂无相关信息</h4></td></tr>');

					}else{

						$('.monitorinformation').html(monitorinformation_02);

					}

					

			}

		});

      

})

}





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

										content: '修改失败',

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

						$('.monitorinfor').html('<tr><td colspan="4"><h4>暂无相关信息</h4></td></tr>');

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

						$('.monitorinfor2').html('<tr><td colspan="6"><h4>暂无相关信息</h4></td></tr>');

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

										content: '修改失败',

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

					warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td><img src="ssd_img/danger.png"></td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');

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

					warninformation.push('<tr><td>'+warningdata.data[index].hostname+' | '+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td>'+warningdata.data[index].warn_level+'</td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');

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

    //initgroups();

    //hostinfo();

    //monitorinfo();

    //search_host();

    //warninformation();

    //warning_by_item()
	backgroundSize();
    groupSize();
    tableSize();

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

$('body').append('<input type="hidden" id="old_group_id"/>')

$(function(){
    
	
	init_refresh();

	
	

	// $('.group li').eq(0).find('span').addClass('active');

	// $('.grouptitle li a').eq(0).click();

	// console.log($('.grouptitle li a').eq(0))

	

});




