$(".header_btn").click(function(){
    	if($(".close").length >0){
        	 		$("#header_left_box").removeClass("close").addClass("open");
    	}else{
        	 		$("#header_left_box").removeClass("open").addClass("close");
    	}}
);


