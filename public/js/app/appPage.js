function goPage(pno,psize){
	var itable = document.getElementById("mainList");
	var iLi = itable.getElementsByTagName("li");
	var num = iLi.length;//alert(num);//表格行数
	var totalPage = 0;//总页数
	var pageSize = psize;//每页显示行数
	if((num)/pageSize > parseInt((num)/pageSize)){
   		 totalPage=parseInt((num)/pageSize)+1;
   	}else{
   		totalPage=parseInt((num)/pageSize);
   	}
	var currentPage = pno;//当前页数
	var startRow = (currentPage - 1) * pageSize;//开始显示的行
   	var endRow = currentPage * pageSize;//结束显示的行
   	endRow = (endRow > num)? num : endRow;
	//前三行始终显示
/*	for(i=0;i<1;i++){
		var irow = iLi[i];
		irow.style.display = "block";
	}*/
	for(var i=0;i<num;i++){
		var irow = iLi[i];
		if(i>=startRow&&i<endRow){
			irow.style.display = "block";
		}else{
			irow.style.display = "none";
		}
	}
	//alert("currentPage:"+currentPage);alert("totalPage:"+totalPage);
	var pageEnd = document.getElementById("pageEnd");
	var tempStr = "";
	if(currentPage>1){
		tempStr += "<a class=\"appBlogPage\" href=\"#\" onClick=\"goPage("+(1)+","+psize+")\">首页</a>";
	}else{
		tempStr += "<a class=\"appBlogPageNone \">首页</a>";
	}
	if(currentPage>1){
		tempStr += "<a class=\"appBlogPage\" href=\"#\" onClick=\"goPage("+(currentPage-1)+","+psize+")\">上页</a>"
	}else{
		tempStr += "<a class=\"appBlogPageNone\">上页</a>";
	}
	if(currentPage<totalPage){
		tempStr += "<a class=\"appBlogPage\" href=\"#\" onClick=\"goPage("+(currentPage+1)+","+psize+")\">下页</a>";
	}else{
		tempStr += "<a class=\"appBlogPageNone\">下页</a>";
	}
	if(currentPage<totalPage){
		tempStr += "<a class=\"appBlogPage\" href=\"#\" onClick=\"goPage("+(totalPage)+","+psize+")\">尾页</a>";
	}else{
		tempStr += "<a class=\"appBlogPageNone\">尾页</a>";
	}
	document.getElementById("barcon").innerHTML = tempStr;
}