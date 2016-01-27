var IsNote = require('../../models/isNote');
var User = require('../../models/user');

var IsNoteModule = require('./module/isNoteModule');
var isIfBlog = 'blog',
    isIfFeel = 'feel',
    isIfNote = 'note',
    isTranslate = 'translate';//isIf：1，博客；2，读后感；3，贴纸；4，翻译。
//var loadTagNode =loadTagJsFn();
/*
    //return loadTagNode;
});*/


//博客
exports.allBlog = function (req, res) {
        IsNoteModule.allBlogCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);


};
exports.blogsByMenu = function (req, res) {
    IsNoteModule.blogsByMenuCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.blogsById = function (req, res) {
    IsNoteModule.blogsByIdCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.content_to_next = function (req, res) {
    IsNoteModule.content_to_nextCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.content_to_prev = function (req, res) {
    IsNoteModule.content_to_prevCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.PageByData = function (req, res) {
    IsNoteModule.PageByDataCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poBlogs = function (req, res) {
    IsNoteModule.poBlogsCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poAddBlogType = function (req, res) {
    IsNoteModule.poAddBlogTypeCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddBlogType = function (req, res) {
    IsNoteModule.toAddBlogTypeCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddBlogType2 = function (req, res) {
    IsNoteModule.toAddBlogType2CallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddBlog = function (req, res) {
    IsNoteModule.toAddBlogCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poReviseBlogs = function (req, res) {
    IsNoteModule.poReviseBlogsCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.editBlogById = function (req, res) {
    IsNoteModule.editBlogByIdCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toEditBlog = function (req, res) {
    IsNoteModule.toEditBlogCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poDeleteBlogs = function (req, res) {
    IsNoteModule.poDeleteBlogsCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.delBlogById = function (req, res) {
    IsNoteModule.delBlogByIdCallBack(IsNote, req, res, isIfBlog, res.locals.publicUserId?res.locals.publicUserId:1);
}
//读后感
exports.allFeel = function (req, res) {
    IsNoteModule.allBlogCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.feelsByMenu = function (req, res) {
    IsNoteModule.blogsByMenuCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.feelsById = function (req, res) {
    IsNoteModule.blogsByIdCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.feelsByNext = function (req, res) {
    IsNoteModule.content_to_nextCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.feelsByPrev = function (req, res) {
    IsNoteModule.content_to_prevCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.pageByFeelData = function (req, res) {
    IsNoteModule.PageByDataCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};

exports.poFeels = function (req, res) {
    IsNoteModule.poBlogsCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poAddFeelType = function (req, res) {
    IsNoteModule.poAddBlogTypeCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddFeelType = function (req, res) {
    IsNoteModule.toAddBlogTypeCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddFeelType2 = function (req, res) {
    IsNoteModule.toAddBlogType2CallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddFeel = function (req, res) {
    IsNoteModule.toAddBlogCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poReviseFeels = function (req, res) {
    IsNoteModule.poReviseBlogsCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.editFeelById = function (req, res) {
    IsNoteModule.editBlogByIdCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toEditFeel = function (req, res) {
    IsNoteModule.toEditBlogCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poDeleteFeels = function (req, res) {
    IsNoteModule.poDeleteBlogsCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.delFeelById = function (req, res) {
    IsNoteModule.delBlogByIdCallBack(IsNote, req, res, isIfFeel, res.locals.publicUserId?res.locals.publicUserId:1);
}
//便签
exports.allNote = function (req, res) {
    IsNoteModule.allBlogCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.notesByMenu = function (req, res) {
    IsNoteModule.blogsByMenuCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};

exports.PostNotesTag = function (req, res) {
    IsNoteModule.poBlogsCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poAddNoteType = function (req, res) {
    IsNoteModule.poAddBlogTypeCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddNoteType = function (req, res) {
    IsNoteModule.toAddBlogTypeCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddNoteType2 = function (req, res) {
    IsNoteModule.toAddBlogType2CallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddNote = function (req, res) {
    IsNoteModule.toAddBlogCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poReviseNotes = function (req, res) {
    IsNoteModule.poReviseBlogsCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.editNoteById = function (req, res) {
    IsNoteModule.editBlogByIdCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toEditNote = function (req, res) {
    IsNoteModule.toEditBlogCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.delNoteById = function (req, res) {
    IsNoteModule.delBlogByIdCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poDeleteNotes = function (req, res) {
    IsNoteModule.poDeleteBlogsCallBack(IsNote, req, res, isIfNote, res.locals.publicUserId?res.locals.publicUserId:1);
};
//翻译
exports.toAddTranslate = function (req, res) {
    IsNoteModule.toAddBlogCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poAddTranslateType = function (req, res) {
    IsNoteModule.poAddBlogTypeCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddTranslateType = function (req, res) {
    IsNoteModule.toAddBlogTypeCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toAddTranslateType2 = function (req, res) {
    IsNoteModule.toAddBlogType2CallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.allTranslate = function (req, res) {
    IsNoteModule.allBlogCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.translatesByMenu = function (req, res) {
    IsNoteModule.blogsByMenuCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.translatesById = function (req, res) {
    IsNoteModule.blogsByIdCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.translatesByNext = function (req, res) {
    IsNoteModule.content_to_nextCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.translatesByPrev = function (req, res) {
    IsNoteModule.content_to_prevCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};


exports.poTranslate = function (req, res) {
    IsNoteModule.poBlogsCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.addTranslateNew = function (req, res) {
    IsNoteModule.poAddBlogTypeCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poReviseTranslate = function (req, res) {
    IsNoteModule.poReviseBlogsCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.editTranslateById = function (req, res) {
    IsNoteModule.editBlogByIdCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.toEditTranslate = function (req, res) {
    IsNoteModule.toEditBlogCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.poDeleteTranslate = function (req, res) {
    IsNoteModule.poDeleteBlogsCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};
exports.delTranslateById = function (req, res) {
    IsNoteModule.delBlogByIdCallBack(IsNote, req, res, isTranslate, res.locals.publicUserId?res.locals.publicUserId:1);
};

