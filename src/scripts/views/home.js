var homeTpl=require("../templates/home.string");
// 引入util
var util = require("../util/util");

SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			//console.log(vm);
			vm.livedata=[];
		}
	}],
	//初始化
	init:{
		vm:null,
		homeSlider:null,
		hotSlider:null,
		livelistArr:[],
		formatData:function(data){
			//console.log(data);
			var tempArr = [];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				tempArr[i] = [];
				tempArr[i].push(data[2*i]);
				tempArr[i].push(data[2*i+1]);
			}
			return tempArr;
		
		}
	},
	bindEvents:{
		beforeShow:function(){
			//获取视图
			var that=this;
			//获取Vm
			that.vm=this.getVM();
			
			$.ajax({
				//url:"/football-app/mock/livelist.json",
				url:"/api/getLivelist.php",
				data:{
					rtype:"origin"
				},
				success:function(rs){
					//console.log(rs);
					that.livelistArr=rs.data;
					that.vm.livedata=that.formatData(rs.data);

					//console.log(vm.livedata);
				},
				error:function(){
					alert('请求失败');
				}
			})
		},

		show:function(){
			//console.log(1);
			var that=this;
			this.hotSlider = new Swiper('#swiper-hot', {
				loop:false,//可选选项，自动滑动
				onSlideChangeStart:function(swiper){//滑动之前开始出发的回调函数
					//console.log(swiper);
					var index= swiper.activeIndex;
					var $tag=$(".m-home nav li");
					//$tag.eq(index).addClass("active").siblings().removeClass("active");
					util.setFocus($tag.eq(index));
				}
			})
			//首次进入页面之后关注那不动，是因为id发生冲突，相同的ID已经缓存过了，所以优先做的是那边的，这边暂时没生效
			this.homeSlider = new Swiper('#swiper-home', {
				loop:false,//可选选项，自动滑动
				onSlideChangeStart:function(swiper){//滑动之前开始出发的回调函数
					//console.log(swiper);
					var index= swiper.activeIndex;
					var $tag=$("#title li");
					//$tag.eq(index).addClass("active").siblings().removeClass("active");
					util.setFocus($tag.eq(index));
				}
			})
/*
			var liveScroll=this.widgets["livenavScroll"];
				liveScroll.options.scrollX=true;
				liveScroll.options.scrollY=false;*/

				//下拉刷新,上拉加载
			var myScroll=this.widgets.homeListScroll;
			var scrollSize=30;
			//console.log(myScroll);
			myScroll.scrollBy(0,-scrollSize);
			var head=$(".head img"),
				topImgHasClass=head.hasClass("up");
			var foot=$(".foot img"),
				bottomImgHasClass=head.hasClass("down");
			myScroll.on("scroll",function(){
				var y=this.y,
				maxY=this.maxScrollY-y;
				if(y>=0){
					!topImgHasClass && head.addClass("up");
					return "";
				}
				if(maxY>=0){
					!bottomImgHasClass && foot.addClass("down");
					return "";
				}
			})
			myScroll.on("scrollEnd",function(){
				if(this.y>=-scrollSize && this.y<0){
					myScroll.scrollTo(0,-scrollSize);
					head.removeClass("up");
				}else if(this.y>=0){
					head.attr("src","/football-app/images/ajax-loader.gif");
					$.ajax({
						//url:"/football-app/mock/livelist.json",
						url:"/api/getLivelist.php",
						type:"get", 
						data:{
							rtype:"refresh"
							
						},
						success:function(rs){
							console.log(rs);
							/*var data = that.vm.livedata.concat(that.formatData(rs.data));
							//that.livelistArr = that.livelistArr.concat(rs.data);
							that.vm.livedata = data; */
							//that.livelistArr = that.livelistArr.concat(rs.data);
							that.livelistArr = rs.data;
							that.vm.livedata = that.formatData(that.livelistArr);
							myScroll.scrollTo(0,-scrollSize);
							head.removeClass("up");
							head.attr("src","/football-app/images/arrow.png");

						},
						error:function(){
							alert("请求失败");
						}
					})
					/*setTimeout(function(){
						myScroll.scrollTo(0,-scrollSize);
						head.removeClass("up");
						head.attr("src","/football-app/images/arrow.png");
					},1000)*/
				}
				var maxY=this.maxScrollY-this.y;
				var self=this;
				if(maxY>-scrollSize && maxY<0){
					myScroll.scrollTo(0,self.maxScrollY+scrollSize);
					foot.removeClass("down")
				}else if(maxY>=0){
					foot.attr("src","/football-app/images/ajax-loader.gif");
					//请求jiazia数据
					$.ajax({
						//url:"/football-app/mock/livelist.json",
						url:"/api/getLivelist.php",
						type:"get", 
						data:{
							rtype:"more"
							/*pageSize:8,
							pageNo:2*/
						},
						success:function(rs){
							console.log(rs);
							that.livelistArr = that.livelistArr.concat(rs.data);
							that.vm.livedata = that.formatData(that.livelistArr); 
							myScroll.refresh();
							myScroll.scrollTo(0,self.y+maxY);
							foot.removeClass("down");
							foot.attr("src","/football-app/images/arrow.png");
						},
						error:function(){
							alert("请求失败");
						}
					})
					/*setTimeout(function(){
						
						myScroll.refresh();
						myScroll.scrollTo(0,self.y+30);
						foot.removeClass("down");
						foot.attr("src","/football-app/images/arrow.png")
					},1000)*/
				}
			})
 
		}
	},
	bindActions:{	
		"tap.slide":function(e){
			//console.log($(e.el).index());
			var index=$(e.el).index();
			this.hotSlider.slideTo(index);//slideto 是 swiper切换到指定slide
		},
		"title.slide":function(e){
			//console.log($(e.el).index());
			var index=$(e.el).index();
			this.homeSlider.slideTo(index);//slideto 是 swiper切换到指定slide
		},
		"goto.detail":function(e,data){
			console.log(data);
			SPA.open("detail",{
				param:data
			});
		}
	}


})