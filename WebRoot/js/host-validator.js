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
                        }
                        
                    }  
                },  
				password: {  
                    message: '密码验证失败',  
                    validators: {  
                        notEmpty: {  
                            message: '密码不能为空'  
                        }
                       
                    }  
                },  
                
            }  
        });  