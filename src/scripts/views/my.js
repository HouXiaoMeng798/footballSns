var myTpl=require("../templates/my.string");

SPA.defineView("my",{
	html:myTpl,
	plugins:["delegated"],
	styles:{
		background:'transparent!important'
	},
	bindActions:{
		"tap.close":function(){
			this.hide();
		},
		"tap.register":function(){
			SPA.open("register",{
				ani:{
					name:"actionSheet",
					distance:180,
					showmask:false
					
				}
			});
				
		}
	}
})