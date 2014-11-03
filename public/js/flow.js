window.onload = function(){ 
	var h=document.getElementById("profile").offsetHeight;alert(h);
	if(h<=600){
		var divcontent=document.getElementById("messages");
		 divcontent.style.height=h;
 	}else{
		var h2=document.getElementById("profile").offsetHeight;
		// var hh=h+h2+70;
		var hh=h;
		var divcontent=document.getElementById("profile");
		 divcontent.style.height=hh+"px";
	}
	if(h>=2000){
		var h2=document.getElementById("profile").offsetHeight;
		// var hh=h+h2+70;
		var hh=h2+150;
		var divcontent=document.getElementById("profile");
		 divcontent.style.height=hh+"px";
	}
}