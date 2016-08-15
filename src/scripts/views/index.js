var indexTpl=require("../templates/index.string");
//引入util
var util=require("../util/util");

SPA.defineView("index",{
	html:indexTpl,
	plugins:["delegated"],
	modules:[{
		name:'content',
		defaultTag:"home",
		views:["home","find","my"],
		container:".m-wrapper"
	}],
	bindEvents:{//绑定视图事件 相当于页面切换，dom加载完图片加载完，事件放这里
				//里面有beforeshow(视图显示出来之前，执行的回调函数)
				//show 是视图显示出来之后执行的回调函数
		show:function(){
			//console.log(1);
			
			/*$.ajax({
				url:"/football-app/mock/livelist.json",
				type:"get",
				dataType:"json",
				async:true,
				success:function(e){
					//console.log(e);
					var jsonDate=e,
						str="";
					//console.log(jsonDate.data);
					$.each(jsonDate.data,function(i,val){
						//console.log(jsonDate.data[1+1]);

						if(i%2==0){
							str+='<ul>'
								+'<li>'
									+'<img src="'+jsonDate.data[i].img+'">'
									+'<b>'+jsonDate.data[i].title+'</b>'
								+'</li>'
						}else{
							str+='<li></li>'
								+'<li>'
									+'<img src="'+jsonDate.data[i].img+'">'
									+'<b>'+jsonDate.data[i].title+'</b>'
								+'</li>'
							+'</ul>'
						}
					
					})
					$("#scroller").html(str);
					$("#scroller ul").last().css("width","49%");
					
					//myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true });
					
				},
				error:function(){
					alert('请求失败');
				}
			})*/
		}

	},
	bindActions:{//给Dom 绑定元素事件
		"switch.tabs":function(e,data){
			//console.log(e.el);
			//$(e.el).addClass("active").siblings().removeClass("active");
			//高亮显示
			util.setFocus($(e.el));
			
			console.log(data.tag);
			//切换子视图
			this.modules.content.launch(data.tag);
			//console.log(Swiper);
		},
		"goto.my":function(){
			SPA.open("my",{
				ani:{
					name:"dialog",
					width:280,
					height:200
				}
			});
		},
		"goto.search":function(){
			SPA.open("find",{
				ani:{
					//name:"actionSheet",
					//distance:180,
					//showmask:false
					
				}
			});
		}
	}
})
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/*var myScroll;
window.onload=function () {

	myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true });
};
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/
