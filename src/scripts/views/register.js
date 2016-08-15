var registerTpl=require("../templates/register.string");

SPA.defineView("register",{
	html:registerTpl,
	plugins:["delegated"],	
	bindEvents:{
		show:function(){
			
		}
	},
	bindActions:{
		"register.close":function(){
			this.hide();
		}
	}
	

})