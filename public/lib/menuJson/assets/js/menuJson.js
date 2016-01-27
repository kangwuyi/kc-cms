var data = {ArrJson:[
	{name:'Dashboard',url:'#',iclass:'icon-dashboard',active:'1'},
	{name:'Typography',url:'#',iclass:'icon-text-width'},
	{
		name:'UI Elements',
		url:'#',
		iclass:'icon-desktop',
		children:[
			{name:'Elements',url:'#',iclass:'icon-double-angle-right'},
			{name:'Buttons & Icons',url:'#',iclass:'icon-double-angle-right'},
			{name:'Treeview',url:'#',iclass:'icon-double-angle-right'},
			{
				name:'Three Level Menu',
				url:'#',
				iclass:'icon-double-angle-right',
				children:[
					{name:'Item #1',url:'#',iclass:'icon-leaf'},
					{
						name:'4th level',
						url:'#',
						iclass:'icon-pencil',
						children:[
							{name:'Add Product',url:'#',iclass:'icon-plus'},
							{name:'View Product',url:'#',iclass:'icon-eye-open'}
						]
					}
				]
			}
		]
	},
	{name:'Tables',url:'#',iclass:'icon-list'},
	{
		name:'Forms',
		url:'#',
		iclass:'icon-edit',
		children:[
			{name:'Form Elements',url:'#',iclass:'icon-double-angle-right'},
			{name:'Wizard & Validation',url:'#',iclass:'icon-double-angle-right'},
			{name:'Wysiwyg & Markdown',url:'#',iclass:'icon-double-angle-right'}
		]
	},
	{name:'Widgets',url:'#',iclass:'icon-list-alt'},
	{name:'Calendar',url:'#',iclass:'icon-calendar',calendarNum:'2'},
	{name:'Gallery',url:'#',iclass:'icon-picture'},
	{
		name:'More Pages',
		url:'#',
		iclass:'icon-tag',
		children:[
			{name:'User Profile',url:'#',iclass:'icon-double-angle-right'},
			{name:'Pricing Tables',url:'#',iclass:'icon-double-angle-right'},
			{name:'Invoice',url:'#',iclass:'icon-double-angle-right'},
			{name:'Login & Register',url:'#',iclass:'icon-double-angle-right'}
		]
	},
	{
		name:'Other Pages',
		url:'#',
		iclass:'icon-file-alt',
		otherPages:'4',
		children:[
			{name:'Error 404',url:'#',iclass:'icon-double-angle-right'},
			{name:'Error 500',url:'#',iclass:'icon-double-angle-right'},
			{name:'Grid',url:'#',iclass:'icon-double-angle-right'},
			{name:'Blank Pages',url:'#',iclass:'icon-double-angle-right'}
		]
	}
	]
};
creatMenu('.main-container',data)
function creatMenu(parentDomId,data){
//=================================================================
var sidebarDom = $('<div class="sidebar" id="sidebar"></div>');
//==============================
var sidebar_shortcutsDom = $('<div class="sidebar-shortcuts" id="sidebar-shortcuts"></div>');
var sidebar_shortcuts_largeDom = $('<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large"></div>');
var sidebar_shortcuts_miniDom = $('<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini"></div>');
//================================
var sidebar_shortcuts_largeDomCildren = '<button class="btn btn-small btn-success"><i class="icon-signal"></i></button> <button class="btn btn-small btn-info"><i class="icon-pencil"></i></button> <button class="btn btn-small btn-warning"><i class="icon-group"></i></button> <button class="btn btn-small btn-danger"><i class="icon-cogs"></i></button>';
var sidebar_shortcuts_miniDomCildren = '<span class="btn btn-success"></span><span class="btn btn-info"></span><span class="btn btn-warning"></span><span class="btn btn-danger"></span>';
sidebar_shortcuts_largeDom.append(sidebar_shortcuts_largeDomCildren);
sidebar_shortcuts_miniDom.append(sidebar_shortcuts_miniDomCildren);
sidebar_shortcuts_largeDom.appendTo(sidebar_shortcutsDom);
sidebar_shortcuts_miniDom.appendTo(sidebar_shortcutsDom);
var sidebarHiddle = $('<input type="hidden" id="sidebarHiddle" class="sidebarHiddle" data-Iclass="" data-nth="" data-children="">');
sidebarHiddle.appendTo(sidebarDom);
sidebar_shortcutsDom.appendTo(sidebarDom);
//===============================================================
var dataList = '<ul class="nav nav-list">';
$.each(data.ArrJson,function(index1,item1){
	if(item1.active){sidebarHiddle.attr('data-Iclass',item1.iclass).attr('data-children',item1.active).attr('data-nth',index1);};
	if(!item1.children){
		if(item1.iclass == 'icon-calendar'){
			dataList+='<li><a href="'+item1.url+'"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'<span class="badge badge-transparent tooltip-error" title="" data-original-title="'+item1.calendarNum+'&nbsp;Important&nbsp;Events"><i class="icon-warning-sign red bigger-130"></i></span></span></a></li>';
		}else{
    		dataList+='<li><a href="'+item1.url+'"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'</span></a></li>';
		};
	}else{
		if(item1.iclass == 'icon-file-alt'){
			dataList+='<li><a href="'+item1.url+'"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'<span class="badge badge-primary ">'+item1.otherPages+'</span></span></a></li>';
		}else{
			dataList+='<li><a href="'+item1.url+'" class="dropdown-toggle"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'</span><b class="arrow icon-angle-down"></b></a><ul class="submenu">';
		};
		$.each(item1.children,function(index2,item2){
			if(item2.active){sidebarHiddle.attr('data-Iclass',item2.iclass).attr('data-children',item2.active).attr('data-nth',index2);};
		    if(!item2.children){
		    	dataList+='<li><a href="'+item2.url+'"><i class="'+item2.iclass+'"></i>'+item2.name+'</a></li>';
		    }else{
		    	dataList+='<li><a href="'+item2.url+'" class="dropdown-toggle"><i class="'+item2.iclass+'"></i>'+item2.name+'<b class="arrow icon-angle-down"></b></a><ul class="submenu">';
		    	$.each(item2.children,function(index3,item3){
		    		if(item3.active){sidebarHiddle.attr('data-Iclass',item3.iclass).attr('data-children',item3.active).attr('data-nth',index3);};
				    if(!item3.children){
				    	dataList+='<li><a href="'+item3.url+'"><i class="'+item3.iclass+'"></i>'+item3.name+'</a></li>';
				    }else{
				    	dataList+='<li><a href="'+item3.url+'" class="dropdown-toggle"><i class="'+item3.iclass+'"></i>'+item3.name+'<b class="arrow icon-angle-down"></b></a><ul class="submenu">';
				    	$.each(item3.children,function(index4,item4){
				    		if(item4.active){sidebarHiddle.attr('data-Iclass',item4.iclass).attr('data-children',item4.active).attr('data-nth',index4);};
				    		if(!item4.children){
						    	dataList+='<li><a href="'+item4.url+'"><i class="'+item4.iclass+'"></i>'+item4.name+'</a></li>';
							}
						});
				    	dataList+='</ul></li>';
				    };
				});
		    	dataList+='</ul></li>';
		    };
		});
		dataList+='</ul></li>';
	};
});
dataList+='</ul>';
$(sidebarDom).append(dataList);
//============================================
var sidebar_collapse = '<div class="sidebar-collapse" id="sidebar-collapse"><i class="icon-double-angle-left"></i></div>';
sidebarDom.append(sidebar_collapse);
sidebarDom.appendTo(parentDomId);
sidebarHiddle.attr('data-Iclass')
}