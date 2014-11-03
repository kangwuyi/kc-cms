
window.onload = function(){ 
	var h=document.getElementById("contents").offsetHeight;
	if(h<=600){
		var divcontent=document.getElementById("contents");
		 divcontent.style.height="600px";
 	}else{
		var h2=document.getElementById("contents").offsetHeight;
		// var hh=h+h2+70;
		var hh=h;
		var divcontent=document.getElementById("contents");
		 divcontent.style.height=hh+"px";
	}
	if(h>=2000){
		var h2=document.getElementById("contents").offsetHeight;
		// var hh=h+h2+70;
		var hh=h2+150;
		var divcontent=document.getElementById("contents");
		 divcontent.style.height=hh+"px";
	}
}
window.onload = function(){ 
	var g=document.getElementById("header-top").offsetHeight;
	if(g<=62){
		var divcontent=document.getElementById("header-top");
		 divcontent.style.height="62px";
 	}else{
		var g2=document.getElementById("header-top").offsetHeight;
		// var hh=h+h2+70;
		var gg=g;
		var divcontent=document.getElementById("header-top");
		 divcontent.style.height=gg+"px";
	}
}