var guideTpl=require("../templates/guide.string");

SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	
	bindEvents:{
		show:function(){
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 3000,//可选选项，自动滑动
			})
		}
	},
	bindActions:{
		"go.home":function(){
			SPA.open("index");
		}
	}
	

})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);