var IsNote = require('../../../../models/isNote');
var Catalogue = require('../../../../models/catalogue');
function loadTagJsFn(isIf,fnCallBack,tag1,tag2) {
    /*function callBackStart(loadTagOjNew) {
        fn(loadTagOjNew)
    }*/
/*    var _that =this;
    _that.loadTagNodeSign = false;*/

    /*     loadTagSql();*/
/*    function callBackStart(loadTagOjNew) {

        //return loadTagNode;

        _that.loadTagNode = loadTagOjNew;
        _that.loadTagNodeSign = true;
        //return loadTagNode;
    }*/
  /*  function loadTagSql(){*/
    var tag_1 = tag1||'noString',
        tag_2 = tag2||'noString';
        IsNote.loadIsNoteTag('err', function (loadTagErr, loadTag) {
            function callBackTag2(loadTagNode2, fn) {
                var loadTag2 = loadTagNode2;
                var loadTagOj = {isNoteTag: {blog: {name:'笔记',url:'/in/blog',iclass:'icon-double-angle-right',children:[]},
                    note: {name:'便签',url:'/in/note',iclass:'icon-double-angle-right',children:[]},
                    feel: {name:'读后感',url:'/in/feel',iclass:'icon-double-angle-right',children:[]},
                    translate: {name:'译文',url:'/in/translate',iclass:'icon-double-angle-right',children:[]}}};
                for (var index = 0, len = loadTag.length; index < len; index++) {
                    loadTag[index].children = [];
                    for (var index2 = 0, len2 = loadTag2.length; index2 < len2; index2++) {
                        if (loadTag2[index2].kt_isTag_id == loadTag[index].kt_isTag_id) {
                            if(tag_1 !='noString'&&tag_2 !='noString'&&tag_1 ==loadTag[index].kt_isTag_id&&tag_2 ==loadTag2[index2].kt_isTag2_id){
                                loadTag[index].children.push({'name':loadTag2[index2].kt_isTag2_name,'url':'/in/'+loadTag[index].kt_isNote_isIf+'sByMenu?tags_ids='+loadTag[index].kt_isTag_id+'&tags2_ids='+loadTag2[index2].kt_isTag2_id,'iclass':'icon-eye-open','tag_sign1':loadTag2[index2].kt_isTag_id,'tag_sign2':loadTag2[index2].kt_isTag2_id,'active':'active'});
                            }else{
                                loadTag[index].children.push({'name':loadTag2[index2].kt_isTag2_name,'url':'/in/'+loadTag[index].kt_isNote_isIf+'sByMenu?tags_ids='+loadTag[index].kt_isTag_id+'&tags2_ids='+loadTag2[index2].kt_isTag2_id,'iclass':'icon-eye-open','tag_sign1':loadTag2[index2].kt_isTag_id,'tag_sign2':loadTag2[index2].kt_isTag2_id});
                            }
                        }
                    };
                    if (loadTag[index].kt_isNote_isIf == 'blog') {
                        loadTagOj.isNoteTag.blog.children.push({'name':loadTag[index].kt_isTag_name,'url':'#','iclass':'icon-leaf',children:loadTag[index].children});
                    } else if (loadTag[index].kt_isNote_isIf == 'feel') {
                        loadTagOj.isNoteTag.feel.children.push({'name':loadTag[index].kt_isTag_name,'url':'#','iclass':'icon-leaf',children:loadTag[index].children});
                    } else if (loadTag[index].kt_isNote_isIf == 'note') {
                        loadTagOj.isNoteTag.note.children.push({'name':loadTag[index].kt_isTag_name,'url':'#','iclass':'icon-leaf',children:loadTag[index].children});
                    } else if (loadTag[index].kt_isNote_isIf == 'translate') {
                        loadTagOj.isNoteTag.translate.children.push({'name':loadTag[index].kt_isTag_name,'url':'#','iclass':'icon-leaf',children:loadTag[index].children});
                    };
                };
                fn(loadTagOj);
            };
            IsNote.loadIsNoteTag2('err', function (loadTag2Err, loadTagNode2) {
                callBackTag2(loadTagNode2, function (loadTagOjNew) {
                    var data = {ArrJson:[
                        {name:'Humor',url:'/in/prose',iclass:'icon-text-width'},
                        {
                            name:'Note',
                            url:'#',
                            iclass:'icon-tag',
                            children:[]
                        },
                        {name:'Domain',url:'/in/domain',iclass:'icon-list'},
                        {
                            name:'Article',
                            url:'#',
                            iclass:'icon-edit',
                            children:[
                                {name:'测试',url:'#',iclass:'icon-double-angle-right'}
                            ]
                        },
                        {name:'Module',url:'/in/assembly',iclass:'icon-list-alt'},
                        {name:'Picture',url:'/in/photo',iclass:'icon-picture'},
                        {
                            name:'Website',
                            url:'/in/catalogue',
                            iclass:'icon-desktop'
                        },
                        {
                            name:'Project',
                            url:'/in/design',
                            iclass:'icon-file-alt',
                            otherPages:'4'
                        }
                    ]};
                    data.ArrJson[1].children=[loadTagOjNew.isNoteTag.blog,loadTagOjNew.isNoteTag.note,loadTagOjNew.isNoteTag.feel,loadTagOjNew.isNoteTag.translate]
                    if(isIf == 'blog'){
                        data.ArrJson[1].children[0].active='active';
                    }else if(isIf == 'note'){
                        data.ArrJson[1].children[1].active='active';
                    }else if(isIf == 'feel'){
                        data.ArrJson[1].children[2].active='active';
                    }else if(isIf == 'translate'){
                        data.ArrJson[1].children[3].active='active';
                    }else if(isIf == 'index'){
                        data.ArrJson[0].active='active';
                    }else if(isIf == 'prose'){
                        data.ArrJson[0].active='active';
                    }else if(isIf == 'domain'){
                        data.ArrJson[2].active='active';
                    }else if(isIf == 'catalogue'){
                        data.ArrJson[6].active='active';
                    }else if(isIf == 'design'){
                        data.ArrJson[7].active='active';
                    }else if(isIf == 'photo'){
                        data.ArrJson[5].active='active';
                    }else if(isIf == 'assembly'){
                        data.ArrJson[4].active='active';
                    };
                    dataNew = JSON.stringify(data);
                    fnCallBack(dataNew);
                });
            });
        });
 /*       if(_that.loadTagNodeSign == false){
            loadTagSql();
        }else{
            _that.callBackFn = function(){
                return _that.loadTagNode;
            }
        }*/
 /*   }*/
/*    var t = setTimeout(function(){
        if(_that.loadTagNodeSign == true){
            clearTimeout(t);
            return  _that.loadTagNode;
        }
    }, 50);*/

};
module.exports=loadTagJsFn;//导出该方法