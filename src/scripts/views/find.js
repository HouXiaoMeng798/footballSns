var findTpl=require("../templates/find.string");

SPA.defineView("find",{
	html:findTpl,
	bindEvents:{
		"show":function(){
			var fxScroll=this.widgets.fixedScroll;
			fxScroll.on("scroll",function(scroll){
				console.log(this.y);
			
				if(Math.abs(this.y)>=60){
					if($(".m-search").siblings(".m-search-menu").length>0){
						;
					}else{
						$(".m-search").after($(".m-search-menu").clone(true).addClass("fixed"));
					}
				}else{
					$(".m-search-menu.fixed").remove();
				}
			})
		}
	}

})