var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var crypto = require('crypto');
var Home = require('./api/home');
var IsNote = require('./api/isNote');
var About = require('./api/about');
var Prose = require('./api/prose');
var User = require('./api/user');
var Catalogue = require('./api/catalogue');
var Domains = require('./api/domain');
var object = require('../models/api/object');
var myDate = require('./dateFormat')();


//前台
router.get('/', Home.indexs);
router.get('/in/toPoIndex',Home.toPoIndex );
router.get('/in/about',Home.about);
router.get('/in/photo',Home.photo);
router.get('/in/design',Home.design);
router.get('/in/assembly',Home.assembly);
router.post('/abcd', Home.abcd);

router.get('/in/blog', IsNote.allBlog);
router.get('/in/blogsByMenu', IsNote.blogsByMenu);
router.get('/in/blogsById',IsNote.blogsById);
router.get('/in/content_to_next',IsNote.content_to_next);
router.get('/in/content_to_prev',IsNote.content_to_prev);
router.get('/in/PageByData', IsNote.PageByData);

router.get('/in/feel', IsNote.allFeel);
router.get('/in/feelsById',IsNote.feelsById);
router.get('/in/feelsByNext',IsNote.feelsByNext);
router.get('/in/feelsByPrev',IsNote.feelsByPrev);
router.get('/in/feelsByMenu', IsNote.feelsByMenu);
router.get('/in/pageByFeelData', IsNote.pageByFeelData);

router.get('/in/note', IsNote.allNote);
router.get('/in/notesByMenu', IsNote.notesByMenu);

router.get('/in/translate', IsNote.allTranslate);
router.get('/in/translatesById',IsNote.translatesById);
router.get('/in/translatesByNext',IsNote.translatesByNext);
router.get('/in/translatesByPrev',IsNote.translatesByPrev);
router.get('/in/translatesByMenu', IsNote.translatesByMenu);
//登录
router.post('/in/login', User.login);
router.post('/in/leave', User.leave);
router.get('/in/registerToInfo', User.registerToInfo);
router.post('/in/registerSubmit', User.registerSubmit);
router.post('/json/verifyUserName', User.verifyUserName);










router.get('/in/domain', Domains.domains);

router.get('/in/prose', Prose.prose);

router.get('/in/catalogue', Catalogue.catalogue);

router.get('/in/toPoIndex', object.checkLogin);

router.get('/in/wendang',About.wendang);
router.get('/in/resume',About.resume);
router.get('/in/enresume',About.enresume);
router.get('/in/pagination-api',About.paginationApi);
router.get('/in/webTree',About.webTree);
router.get('/in/pagination-api-source',About.paginationApiSource);
router.get('/in/kcool',About.kcool);
router.get('/in/kcool-source',About.kcoolSource);
router.get('/in/colorGradient',About.colorGradient);
router.post('/in/colorCount',About.colorCount);




//后台
router.get('/poHome', Home.poHome);
router.get('/poAdds', Home.poAdds);
router.get('/poRevise', Home.poRevise);
router.get('/poDelete', Home.poDelete);

router.get('/poBlogs', IsNote.poBlogs);
router.get('/poAddBlogType', IsNote.poAddBlogType);
router.post('/toAddBlogType', IsNote.toAddBlogType);
router.post('/toAddBlogType2', IsNote.toAddBlogType2);
router.post('/toAddBlog',IsNote.toAddBlog);
router.get('/poReviseBlogs', IsNote.poReviseBlogs);
router.get('/editBlogById', IsNote.editBlogById);
router.post('/toEditBlog', IsNote.toEditBlog);
router.get('/poDeleteBlogs', IsNote.poDeleteBlogs);
router.get('/delBlogById', IsNote.delBlogById);

router.get('/poFeels', IsNote.poFeels);
router.get('/poAddFeelType', IsNote.poAddFeelType);
router.post('/toAddFeelType', IsNote.toAddFeelType);
router.post('/toAddFeelType2', IsNote.toAddFeelType2);
router.post('/toAddFeel', IsNote.toAddFeel);
router.get('/poReviseFeels', IsNote.poReviseFeels);
router.get('/editFeelById', IsNote.editFeelById);
router.post('/toEditFeel', IsNote.toEditFeel);
router.get('/poDeleteFeels', IsNote.poDeleteFeels);
router.get('/delFeelById', IsNote.delFeelById);

router.get('/poTranslate', IsNote.poTranslate);//toAddTranslate
router.post('/toAddTranslate', IsNote.toAddTranslate);
router.get('/poAddTranslateType', IsNote.poAddTranslateType);
router.post('/addTranslateNew', IsNote.addTranslateNew);
router.post('/toAddTranslateType', IsNote.toAddTranslateType);
router.post('/toAddTranslateType2', IsNote.toAddTranslateType2);
router.get('/poReviseTranslate', IsNote.poReviseTranslate);
router.get('/editTranslateById', IsNote.editTranslateById);
router.post('/toEditTranslate', IsNote.toEditTranslate);
router.get('/poDeleteTranslate', IsNote.poDeleteTranslate);
router.get('/delTranslateById', IsNote.delTranslateById);

router.get('/poAddNoteType', IsNote.poAddNoteType);
router.get('/poNotes', IsNote.PostNotesTag);
router.post('/toAddNoteType', IsNote.toAddNoteType);
router.post('/toAddNoteType2', IsNote.toAddNoteType2);
router.post('/toAddNote',IsNote.toAddNote);
router.get('/poReviseNotes', IsNote.poReviseNotes);
router.get('/editNoteById', IsNote.editNoteById);
router.post('/toEditNote', IsNote.toEditNote);
router.get('/poDeleteNotes', IsNote.poDeleteNotes);
router.get('/delNoteById', IsNote.delNoteById);

router.get('/poProse', Prose.poProse);
router.post('/toAddProse',Prose.toAddProse );
router.get('/poReviseProse', Prose.poReviseProse);
router.get('/editProseById', Prose.editProseById);
router.post('/toEditProse', Prose.toEditProse);
router.get('/poDeleteProse', Prose.poDeleteProse);
router.get('/delProseById', Prose.delProseById);

router.get('/poCatalogue', Catalogue.poCatalogue);
router.get('/poAddCatalogueType', Catalogue.poAddCatalogueType);
router.post('/addCatalogueType', Catalogue.addCatalogueType);
router.post('/addCatalogue', Catalogue.addCatalogue);
router.get('/poReviseCatalogue', Catalogue.poReviseCatalogue);
router.get('/editCatalogueById', Catalogue.editCatalogueById);
router.post('/toEditCatalogue', Catalogue.toEditCatalogue);
router.get('/poDeleteCatalogue', Catalogue.poDeleteCatalogue);
router.get('/delCatalogueById', Catalogue.delCatalogueById);



module.exports = router;