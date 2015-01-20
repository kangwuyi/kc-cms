var express = require('express');
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求
var router = express.Router();
var crypto = require('crypto');
var Home = require('./api/home');
var Blog = require('./api/blog');
var Note = require('./api/note');
var Feel = require('./api/feel');
var About = require('./api/about');
var Prose = require('./api/prose');
var User = require('./api/user');
var Catalogue = require('./api/catalogue');
var Domains = require('./api/domain');
var Translate = require('./api/translate');
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

router.get('/in/blog', Blog.allBlog);
router.get('/in/blogsById',Blog.blogsById);
router.get('/in/content_to_next',Blog.content_to_next);
router.get('/in/content_to_prev',Blog.content_to_prev);
router.get('/in/blogsByMenu', Blog.blogsByMenu);
router.get('/in/PageByData', Blog.PageByData);

router.get('/in/feel', Feel.allFeel);
router.get('/in/feelsById',Feel.feelsById);
router.get('/in/feelsByNext',Feel.feelsByNext);
router.get('/in/feelsByPrev',Feel.feelsByPrev);
router.get('/in/feelsByMenu', Feel.feelsByMenu);
router.get('/in/pageByFeelData', Feel.pageByFeelData);

router.get('/in/note', Note.allNote);
router.get('/in/notesByMenu', Note.notesByMenu);

router.get('/in/translate', Translate.allTranslate);
router.get('/in/translatesById',Translate.translatesById);
router.get('/in/translatesByNext',Translate.translatesByNext);
router.get('/in/translatesByPrev',Translate.translatesByPrev);
router.get('/in/translatesByMenu', Translate.translatesByMenu);

router.get('/in/domain', Domains.domains);

router.get('/in/prose', Prose.prose);

router.get('/in/catalogue', Catalogue.catalogue);

router.get('/in/toPoIndex', object.checkLogin);

router.get('/in/wendang',About.wendang);
router.get('/in/resume',About.resume);
router.get('/in/enresume',About.enresume);
router.get('/in/pagination-api',About.paginationApi);
router.get('/in/pagination-api-source',About.paginationApiSource);
router.get('/in/kcool',About.kcool);
router.get('/in/kcool-source',About.kcoolSource);
router.get('/in/colorGradient',About.colorGradient);
router.post('/in/colorCount',About.colorCount);

router.post('/in/login', User.login);
router.post('/in/leave', User.leave);


//后台
router.get('/poHome', Home.poHome);
router.get('/poAdds', Home.poAdds);
router.get('/poRevise', Home.poRevise);
router.get('/poDelete', Home.poDelete);

router.get('/poBlogs', Blog.poBlogs);
router.get('/poAddBlogType', Blog.poAddBlogType);
router.post('/toAddBlogType', Blog.toAddBlogType);
router.post('/toAddBlog',Blog.toAddBlog);
router.get('/poReviseBlogs', Blog.poReviseBlogs);
router.get('/editBlogById', Blog.editBlogById);
router.post('/toEditBlog', Blog.toEditBlog);
router.get('/poDeleteBlogs', Blog.poDeleteBlogs);
router.get('/delBlogById', Blog.delBlogById);

router.get('/poFeels', Feel.poFeels);
router.get('/poAddFeelType', Feel.poAddFeelType);
router.post('/toAddFeelType', Feel.toAddFeelType);
router.post('/toAddFeel', Feel.toAddFeel);
router.get('/poReviseFeels', Feel.poReviseFeels);
router.get('/editFeelById', Feel.editFeelById);
router.post('/toEditFeel', Feel.toEditFeel);
router.get('/poDeleteFeels', Feel.poDeleteFeels);
router.get('/delFeelById', Feel.delFeelById);

router.get('/poTranslate', Translate.poTranslate);
router.post('/addTranslateNew', Translate.addTranslateNew);
router.get('/poReviseTranslate', Translate.poReviseTranslate);
router.get('/editTranslateById', Translate.editTranslateById);
router.post('/toEditTranslate', Translate.toEditTranslate);
router.get('/poDeleteTranslate', Translate.poDeleteTranslate);
router.get('/delTranslateById', Translate.delTranslateById);

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

router.get('/poAddNoteType', Note.poAddNoteType);
router.get('/poNotes', Note.PostNotesTag);
router.post('/toAddNoteType', Note.toAddNoteType);
router.post('/toAddNote',Note.toAddNote);
router.get('/poReviseNotes', Note.poReviseNotes);
router.get('/editNoteById', Note.editNoteById);
router.post('/toEditNote', Note.toEditNote);
router.get('/poDeleteNotes', Note.poDeleteNotes);
router.get('/delNoteById', Note.delNoteById);

module.exports = router;