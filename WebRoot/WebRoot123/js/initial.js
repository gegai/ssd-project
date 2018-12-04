//var flag = false;
//var file = document.getElementById('#groupajaxupload').files[0];
/*console.log("-----------")
$("#groupupload").click(function(){
	console.log("-----------")
	if($('input[type="file"]').val()!=""){
		//var fileobj = document.getElementById('#groupajaxupload').files[0];
		 var fileobj = $("#groupajaxupload")[0].files[0];
		console.log("-----------")
		console.log(fileobj);
		var form=new FormData();
		form.append("file",fileobj);
		$.ajax({  
			url: "/api/v1/ssd/quick_add_group",  //用于文件上传的服务器端请求地址  
			type: 'POST',   
            data: form,
            processData: false, 
            contentType: false,   
            success: function (arg) {
                    console.log(arg)
                },
			
		});
	}else{
		$.alert({
			title: '提示',
			type:'orange',
			content: '请选择文件'
		});
	}
})*/

/*$("#hostupload").click(function(){
	console.log("-----------")
	if($('input[type="file"]').val()!=""){
		 $.ajaxFileUpload({  
			url: "/api/v1/ssd/quick_add_host",  //用于文件上传的服务器端请求地址  
			secureuri: false, 
			type:'post',
			 enctype:"multipart/form-data",

			fileElementId: "hostajaxupload",            //文件上传空间的id属性  <input type="file" id="file" name="file" />  
			dataType: "json",  
			success:function(data){
				console.log(data)
				if(data.status==10000){
					$.alert({
						title: '提示',
						type:'orange',
						content: '添加成功'
					});
					flag=true;
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
		});
	}else{
		$.alert({
			title: '提示',
			type:'orange',
			content: '请选择文件'
		});
	}
})*/
	
$(function(){
//	$("[data-toggle='tooltip']").tooltip();
    /** 验证文件是否导入成功  */  
    $("#form1").ajaxForm(function(data){    
        if(data.status=='10000'){
							$.alert({
									title: '提示',
									type:'orange',
									content: '上传成功'
								});
//      			flag=true;
        }
else if(data.status=='10001'){
							$.alert({
									title: '提示',
									type:'orange',
									content: '上传失败'
								});
		}   
    });       
});  
	
	
$(".addhost").click(function(){
		
		var bootstrapValidator = $("#host_add_form").data('bootstrapValidator');
		bootstrapValidator.validate();
		if(bootstrapValidator.isValid()){
			
			if($("#group_id").val() == '' || typeof($("#group_id").val()) == 'undefined' ){
				$.alert({
					title: '提示',
					type:'orange',
					content: '请选择分组'
				})
				return;
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
									content: '添加成功'
								});
//								flag=true;
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
		}else{
			$.alert({
				title: '提示',
				type:'orange',
				content: '表单校验失败，请检查'
			});
		}
});

function init_select_group(){
	$.ajax({
			type: 'post',
			async:false,
			url: '/api/v1/ssd/initgroup',
			contentType:'application/json',
			success:function(data){
				var grouphtml = '';
				var group_list = data.group_list;
				for(var index in group_list){	
					grouphtml += '<option value="'+group_list[index].group_id+'">'+group_list[index].group_name+'</option>';
				}
				$('#group_id').html(grouphtml)
			}
	})
}
init_select_group();

var addgrouphtml = '';
addgrouphtml +='<label>分组名称：<input type="text" id="group_name" class="form-control" placeholder="请输入分组名称" style="display: inline-block;width: auto"></label>';
$(".initialaddgroup").click(function(){
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
									content: '添加成功'
								});
								init_select_group();
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

$('#start_monitor').click(function(){
		window.location.href='/index.html'
//	else{
//		$.alert({
//			title: '提示',
//			type:'orange',
//			content: '请先添加主机'
//		});
//	}
})
 