
a_reader_next = function(){ 
	var x = document.getElementById('tags_open_next').value;
	var y = document.getElementById('tags_open_prev').value;
	//alert(x);alert(y);
	if(x==1){
		document.getElementById("a_reader_next").style.color='rgb(167, 161, 161)'; 
		document.getElementById("a_reader_next").onclick = function(){return false;}; 
	}else{
		document.getElementById("a_reader_next").style.color='#6DAF45'; 
		document.getElementById("a_reader_next").onclick = function(){return true;};	
	}
	if(y==1){
		document.getElementById("a_reader_prev").style.color='rgb(167, 161, 161)'; 
		document.getElementById("a_reader_prev").onclick = function(){return false;}; 
	}else{
		document.getElementById("a_reader_prev").style.color='#6DAF45'; 
		document.getElementById("a_reader_prev").onclick = function(){return true;};	
	}
}
a_reader_next();