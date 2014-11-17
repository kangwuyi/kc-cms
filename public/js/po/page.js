function goPage(pno,psize){
	var itable = document.getElementById("idData");
	var num = itable.rows.length;//表格行数
	var totalPage = 0;//总页数
	var pageSize = psize;//每页显示行数
	if((num-1)/pageSize > parseInt((num-1)/pageSize)){
   		 totalPage=parseInt((num-1)/pageSize)+1;
   	}else{
   		totalPage=parseInt((num-1)/pageSize);
   	}
	var currentPage = pno;//当前页数
	var startRow = (currentPage - 1) * pageSize+1;//开始显示的行
   	var endRow = currentPage * pageSize+1;//结束显示的行
   	endRow = (endRow > num)? num : endRow;
	//前三行始终显示
	for(i=0;i<1;i++){
		var irow = itable.rows[i];
		irow.style.display = "block";
	}
	for(var i=1;i<num;i++){
		var irow = itable.rows[i];
		if(i>=startRow&&i<endRow){
			irow.style.display = "block";
		}else{
			irow.style.display = "none";
		}
	}
	var pageEnd = document.getElementById("pageEnd");
	var tempStr = "共"+(num-1)+"条记录 分"+totalPage+"页 当前第"+currentPage+"页";
	if(currentPage>1){
		tempStr += "<a href=\"#\" onClick=\"goPage("+(currentPage-1)+","+psize+")\">上一页</a>"
	}else{
		tempStr += "上一页";
	}
	if(currentPage<totalPage){
		tempStr += "<a href=\"#\" onClick=\"goPage("+(currentPage+1)+","+psize+")\">下一页</a>";
	}else{
		tempStr += "下一页";
	}
	if(currentPage>1){
		tempStr += "<a href=\"#\" onClick=\"goPage("+(1)+","+psize+")\">首页</a>";
	}else{
		tempStr += "首页";
	}
	if(currentPage<totalPage){
		tempStr += "<a href=\"#\" onClick=\"goPage("+(totalPage)+","+psize+")\">尾页</a>";
	}else{
		tempStr += "尾页";
	}
	document.getElementById("barcon").innerHTML = tempStr;
}