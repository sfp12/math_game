$(document).ready(function(){
	//需要记录的参数
	var commentset;
	var type4set;
	var timeset;
	var buttonset;
	var correctanswerset;
	var timeaverage=48000;
	var testtime;
	var stimset;
	
	var num = 0;   //表示数组的序号
	var title_index=1;   //递增的题号
	var show_timeout;    ///showHide内的第一个setTimeout
	var game_start_time=new Date().getTime();   //测验开始的时间
	var num_res;  //showHide function return.
	var w_array;  //最初的数组，8-16个，.3,不重复
	var flag=false;    //判断左边是否隐藏
	var flag_start=false;
	
//程序开始,实现按任意键开始。
$('html').keydown(function(){
	if(flag_start==false){
		$('#wel').css('display','none');
		$('#container').css('display','block');
		flag_start=true;
		gameStart(num);
	}
});


function gameStart(num){
	leftStart(num);		
	rightStart();	
}

function leftStart(num){
	//生成一个两位数;产生8-16的随机数，并生成相应个数的不重复数组.
	var start_target=Math.round(Math.random()*(99-1)+1);
	w_array=wArray(start_target);
	if(start_target<10)
		start_target='0'+start_target;
	w_array.unshift(start_target);
	//测试输出
	console.log('最初的数组：'+w_array.toString());	
		
	//执行显示隐藏，并返回自身。
	num_res=showHide(num,w_array); 
}

//实现显示，隐藏的功能
function showHide(num,array){
	$("#change_digit").show();
	$("#change_digit").html(array[num]);	
	showHide.digit_st=new Date().getTime();	
	var b_num=num;   //为了判断first settimeout 是否执行
	if(num==0){
		$('#change_digit').css('color','red');
	}else{
		$('#change_digit').css('color','white');
	}

	if(num==0){                                            //如果不是第一个元素的话，才执行原来的代码。
		
	}else{
		show_timeout=setTimeout(function(){
			//record
			var digit_title;
			var digit_correct;
			if(num==0){
				digit_title=array[num]+'r;';
			}else{
				digit_title=array[num]+'w;';
			}
			commentset+=digit_title;		

			type4set+=1+';';		

			timeset+=1000+';';
			
			buttonset+='0;';		

			if(num==0||array[num]==array[0]){
				digit_correct='Q;';
			}else{
				digit_correct='0;';
			}
			correctanswerset+=digit_correct;		

			stimset+=title_index+';';
			title_index++;	
			$("#change_digit").hide();
			console.log('showHide hide');
			flag=true;	
			num++;
		},1000);
		
		var interval=Math.round(Math.random()*(3000-2000)+2000);
				
		setTimeout(function(){			
			flag=false;
			if(b_num==num)
				num++;
			showHide.num=num;			
			if(num<array.length&&new Date().getTime()-game_start_time<timeaverage){
				showHide(num,array);
			}else{				
				if(new Date().getTime()-game_start_time>timeaverage){
					alert('超过测验总时间');   //需要删除的
					testtime=dataOut();

					console.log('题目:'+commentset.slice(9));
					console.log('类型:'+type4set.slice(9));
					console.log('反应时间:'+timeset.slice(9));
					console.log('按键:'+buttonset.slice(9));
					console.log('答案:'+correctanswerset.slice(9));
					console.log('总时间:'+timeaverage);
					console.log('结束时间:'+testtime);
					console.log('题号:'+stimset.slice(9));
					var answer=
					$('#commentset').html('题目:'+commentset.slice(9));
					$('#type4set').html('类型:'+type4set.slice(9));
					$('#timeset').html('反应时间:'+timeset.slice(9));
					$('#buttonset').html('按键:'+buttonset.slice(9));
					$('#correctanswerset').html('答案:'+correctanswerset.slice(9));
					$('#timeaverage').html('总时间:'+timeaverage);
					$('#testtime').html('结束时间:'+testtime);
					$('#stimset').html('题号:'+stimset.slice(9));
				}else{					
					num=0;
					showHide.num=undefined;
					leftStart(num);
				}
			}		
		},interval);
	}
	return showHide;
}

//得到8-16不重复的数组。 
function wArray(target){
		//得到8-16不重复的数组。 		
	var array_len=Math.round(Math.random()*(16-8)+8);  		
		var o={};
		var i=0;
		var array=[];
  	while(i<array_len){
  		var double_num=Math.round(Math.random()*99);
  		if(o[double_num+'']!=1){
  			array.push(double_num);
  			i++;
  			o[double_num+'']=1;
  		}
  	}	

	//检测数组中是否有起始目标刺激
	var target_num=0;
	var target_pos=0;
	if(-1!=array.indexOf(target)){
		target_num=1;
		target_pos=array.indexOf(target);
	}

  	//数组中插入起始目标刺激。
  	var res_len=Math.round(array_len*0.3);
  	var j=0;
  	var p={};
  	while(j<res_len-target_num){
  		var res_pos=Math.round(Math.random()*array_len);
  		if(p[res_pos+'']!=1&&res_pos!=target_pos){
  			array.splice(res_pos,1,target);
  			j++;
  			p[res_pos+'']=1;
  		}
  	}
  	//一位数变为二位数
  	for(var k=0;k<array.length;k++){
  		if(array[k]<10){
  			array[k]='0'+array[k];
  		}
  	}
  	return array;  	
}

//右侧开始
function rightStart(){
	var cal_result=calInDiv();
	var cal_st=new Date().getTime();
	var interval;

	$('html').keydown(function(event){		
		if(new Date().getTime()-game_start_time<timeaverage){			
			if(flag!=true){
				//左侧显示
				if(event.which==79||event.which==80||event.which==81){
					if(event.which==79||event.which==80){
						if($('#cal_que').css('display')=='block'){							
							//记录的参数。
							commentset+=cal_result.split('&')[0];							
							type4set+='2;';							
							com_time=new Date().getTime()-cal_st;
							timeset+=com_time+';';	
							if(event.which==79)
								buttonset+='O;';
							else
								buttonset+='P;';							
							correctanswerset+=cal_result.split('&')[1]+';';	
							stimset+=title_index+';';
							title_index++;
						
							$('#cal_que').hide();
							$('#cal_ans').hide();
							setTimeout(function(){
								$('#cal_que').show();
								$('#cal_ans').show();								
								cal_result=calInDiv();								
								cal_st=new Date().getTime();
							},1000);
						}else{							
						}
					}else{
						if(num_res.num==undefined){                                     //判断是不是数组的第一个元素，是的话,就执行以下代码
							if($("#change_digit").css('display')=='block'){         //判断数字是否显示，是的话，执行以下代码。
								$("#change_digit").hide();
								interval=Math.round(Math.random()*(3000-2000)+2000);
								setTimeout(function(){								
									showHide(1,w_array);		
								},interval);

								//在这里记录
								var array_index;
								if(num_res.num==undefined){
									array_index=0;
								}else{
									array_index=num_res.num;
								}
								var digit_title_btn;
								var digit_correct_btn;
								if(array_index==0){
									digit_title_btn=w_array[array_index]+'r;';
								}else{
									digit_title_btn=w_array[array_index]+'w;';
								}
								commentset+=digit_title_btn;							
								type4set+=1+';';								
								timeset+=new Date().getTime()-num_res.digit_st+';';								
								buttonset+='Q;';
								if(array_index==0||w_array[array_index]==w_array[0]){
									digit_correct_btn='Q;';
								}else{
									digit_correct_btn='0;';
								}		
								correctanswerset+=digit_correct_btn;							
								stimset+=title_index+';';
								title_index++;
							}
						}else{                                           //如果不是第一个元素，就执行原来的代码
							clearTimeout(show_timeout);
							$("#change_digit").hide();

							//在这里记录
							var array_index;
							if(num_res.num==undefined){
								array_index=0;
							}else{
								array_index=num_res.num;
							}
							var digit_title_btn;
							var digit_correct_btn;
							if(array_index==0){
								digit_title_btn=w_array[array_index]+'r;';
							}else{
								digit_title_btn=w_array[array_index]+'w;';
							}
							commentset+=digit_title_btn;								
							type4set+=1+';';								
							timeset+=new Date().getTime()-num_res.digit_st+';';								
							buttonset+='Q;';	
							if(array_index==0||w_array[array_index]==w_array[0]){
								digit_correct_btn='Q;';
							}else{
								digit_correct_btn='0;';
							}		
							correctanswerset+=digit_correct_btn;							
							stimset+=title_index+';';
							title_index++;
						}						
					}
				}else{					
					alert('只能按QOP键');					
				}
			}else{
				//左侧隐藏
				if(event.which==79||event.which==80){
					if($('#cal_que').css('display')=='block'){							
							//记录的参数。
							commentset+=cal_result.split('&')[0];							
							type4set+='2;';							
							com_time=new Date().getTime()-cal_st;
							timeset+=com_time+';';
							if(event.which==79)
								buttonset+='O;';
							else
								buttonset+='P;';							
							correctanswerset+=cal_result.split('&')[1]+';';	
							stimset+=title_index+';';
							title_index++;

							$('#cal_que').hide();
							$('#cal_ans').hide();
							setTimeout(function(){
								$('#cal_que').show();
								$('#cal_ans').show();
								
									cal_result=calInDiv();
								
								cal_st=new Date().getTime();
							},1000);
					}else{
							
						}
				}
			}

		}else{
			alert('超过测验总时间');
			testtime=dataOut();
			console.log('题目:'+commentset.slice(9));
			console.log('类型:'+type4set.slice(9));
			console.log('反应时间:'+timeset.slice(9));
			console.log('按键:'+buttonset.slice(9));
			console.log('答案:'+correctanswerset.slice(9));
			console.log('总时间:'+timeaverage);
			console.log('结束时间:'+testtime);
			console.log('题号:'+stimset.slice(9));
			var answer=
			$('#commentset').html('题目:'+commentset.slice(9));
			$('#type4set').html('类型:'+type4set.slice(9));
			$('#timeset').html('反应时间:'+timeset.slice(9));
			$('#buttonset').html('按键:'+buttonset.slice(9));
			$('#correctanswerset').html('答案:'+correctanswerset.slice(9));
			$('#timeaverage').html('总时间:'+timeaverage);
			$('#testtime').html('结束时间:'+testtime);
			$('#stimset').html('题号:'+stimset.slice(9));
		}
	});
}

//把得到的等式插入div中
function calInDiv(){
	var calculation=calQuestion(0);     //0是题库参数
	var cal_array=calculation.split('=');
	$('#cal_que').html(cal_array[0]);
	var ran=Math.round(Math.random());
	$('#cal_ans_left').html(cal_array[1].split('?')[ran]);
	$('#cal_ans_right').html(cal_array[1].split('?')[1-ran]); 
	var correct_ans;
	if(ran==0)
		correct_ans='O';
	else
		correct_ans='P';	
	return cal_array[1].split('?')[2]+'&'+correct_ans;
}

//得到一个等式，题库的参数
function calQuestion(cal_flag){
	//得到一个算术题
	var calculation;
	var array_0=['+','-','*','/'];
	var array_1=['+','-','*'];
	if(cal_flag==0){
		calculation=genCal(array_0);
	}else if(cal_flag==1){
		calculation=genCal(array_1);
	}else{
		console.log('题库参数异常');
	}
	return calculation;
}

//被calQuestion调用，得到一个一般的等式  	
function genCal(array){
	var calculation;
	var cal_sign_index=Math.round(Math.random()*(array.length-1));
	var cal_sign=array[cal_sign_index];
	var argu_1;
	var argu_2;
	var answer;
	if(cal_sign=='-'||cal_sign=='+'){
		argu_1=Math.round(Math.random()*(20-2)+2);
		argu_2=Math.round(Math.random()*((argu_1-1)-1)+1);
		answer=argu_1-argu_2;
		if(cal_sign=='-'){			
			calculation=argu_1+'-'+argu_2+'='+answer+'?'+wrongAns_1(answer)+'?'+argu_1+'s'+argu_2+';';
		}else{			
			calculation=answer+'+'+argu_2+'='+argu_1+'?'+wrongAns_1(argu_1)+'?'+answer+'a'+argu_2+';';
		}		
	}else{
		argu_1=Math.round(Math.random()*(9-1)+1);
		argu_2=Math.round(Math.random()*(9-1)+1);
		answer=argu_1*argu_2;
		if(cal_sign=='*'){					
			calculation=argu_1+'×'+argu_2+'='+answer+'?'+wrongAns_2(argu_1,argu_2)+'?'+argu_1+'m'+argu_2+';';
		}else{			
			calculation=answer+'÷'+argu_2+'='+argu_1+'?'+wrongAns_1(argu_1)+'?'+answer+'d'+argu_2+';';
		}	
	}
	return calculation;
}

//一种错误答案的设置方法
function wrongAns_1(answer){
	var wrong;
	var array=[-2,-1,1,2];
	var wrong_index=Math.round(Math.random()*3);
	var wrong_sign=array[wrong_index];
	wrong=answer+wrong_sign;
	if(wrong<0)
		wrong=0;
	return wrong;
} 

//另一种错误答案的设置方法
function wrongAns_2(argu1,argu2){
	var wrong;
	var array=[-1,1];
	var wrong_index=Math.round(Math.random());
	var wrong_sign=array[wrong_index];
	// var answer=argu1*argu2/gcd(argu1,argu2)
	wrong=argu1*(argu2+wrong_sign);
	if(wrong<0)
		wrong=0;
	return wrong;
} 

//日期输出的标准格式
function dataOut(){
	var year=new Date().getFullYear();
	var month=new Date().getMonth()+1;
	var day=new Date().getDate();
	var hour=new Date().getHours();
	var min=new Date().getMinutes();
	var sec=new Date().getSeconds();	
	var time=year+'/'+month+'/'+day+' '+hour+':'+min+':'+sec;	
	return time;
}

});

