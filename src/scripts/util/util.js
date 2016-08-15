var util={
	setFocus:function(el){//传参
		el.addClass("active").siblings().removeClass("active");

	}
}

module.exports=util;//用这个方法将util暴露出来


