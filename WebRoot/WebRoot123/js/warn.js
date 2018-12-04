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
					warninformation.push('<tr><td>'+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td>'+warningdata.data[index].warn_level+'</td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch" checked /><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
				}else{
					warninformation.push('<tr><td>'+warningdata.data[index].warn_ip+'</td><td>'+warningdata.data[index].card+'</td><td>'+warningdata.data[index].warn_level+'</td><td >'+warningdata.data[index].warn_item+'</td><td><input type="checkbox" class="mySwitch"/><input type="hidden" name="id" value="'+warningdata.data[index].id+'"></td><td>'+warningdata.data[index].time+'</td><td>'+warningdata.data[index].threshold+'</td><td>'+warningdata.data[index].ssd_value+'</td></tr>');
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
    //initgroups();
    //hostinfo();
    //monitorinfo();
    //search_host();
    warninformation();
    //warning_by_item()
    
}
//warninformation();
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
