window.onload = function(){ 
	var h=document.getElementById("div_list").offsetHeight;
	if(h<=600){
		var divcontent=document.getElementById("main");
		 divcontent.style.height="600px";
 	}else{
		var h2=document.getElementById("div_list_2").offsetHeight;
		var hh=h+h2+70;
		var divcontent=document.getElementById("main");
		 divcontent.style.height=hh+"px";
	}
}