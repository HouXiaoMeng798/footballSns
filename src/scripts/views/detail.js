var detailTpl=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.imgsrc="";
			vm.title=null;
			vm.description=null;
			vm.isShowLoading=true;
		}
	}],
	bindEvents:{
		show:function(){
			//console.log(this);
			var id=this.param.id;
			console.log(id);
			var vm=this.getVM();
			$.ajax({
				//url:"/football-app/mock/livelist.json",
				//url:"/football-app/mock/liveDetail.json",
				url:"/api/getLivelist.php",
				data:{
					id:id
				},
				success:function(rs){
					
					//console.log(rs.data);
					var data=rs.data;
					vm.imgsrc=data[0].imgsrc;
					vm.title=data[0].title;
					vm.description=data[0].description;
					setTimeout(function(){
						vm.isShowLoading=false;
					},1000)
					
				}


			})
		}
	},
	bindActions:{
		"goto.back":function(e){
			
			SPA.open("index");
		}
	}
})