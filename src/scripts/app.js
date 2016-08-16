/*var indexTpl=require("./templates/index.string");
console.log(indexTpl);
var content=document.body.innerHTML;

document.body.innerHTML=content+indexTpl;*/


require("./lib/spa.min");
require('./lib/swiper-3.3.1.min');
require("./views/index");
require("./views/home");
require("./views/find");
require("./views/my");
require("./views/guide");
require("./views/detail");
require("./views/register");




SPA.config({

	indexView:"master"

})

