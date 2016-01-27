(function() {
    var kcool = require('../../../../public/lib/kcool');
    var object = require('../../../../models/api/object');
    var pagination = require('pagination-api');
    var myDate = require('../../../dateFormat')();



    var publicNote = {

        //把公用部分抽象出来
        publicAllNoteCallBack: function (IsNote, req, res, isIf, publicUserId,isTag_id,isTag2_id, base_url, fn){
            IsNote.PostSorts_count_all_result( isIf, publicUserId,isTag_id,isTag2_id,function (PostSorts_count_all_resultErr, PostSorts_count_all_result) {
                var count_all_result = PostSorts_count_all_resultErr?1:PostSorts_count_all_result[0].count_all_result,	//count_all_result是所有博客的总数量
                    total_rows = count_all_result,
                    per_page = 4,
                    per_pages = req.query.per_page ? req.query.per_page: 1,
                    changePer_page = (per_pages - 1) * per_page;//console.log(changePer_page);
                IsNote.PostGet_all(isIf, publicUserId,isTag_id,isTag2_id, changePer_page,per_page,function (PostGet_allErr, PostGet_all) {
                    PostGet_all = PostGet_allErr?[]:PostGet_all;
                    var Create_links = pagination.create_links(total_rows,per_page,per_pages,base_url);
                    IsNote.PostDate( isIf, publicUserId, function (PostDateErr, PostDate) {
                        PostDate = PostDateErr?[]:PostDate;
                        IsNote.PostTag( isIf, publicUserId, function (PostTagErr, PostTag) {
                            PostTag = PostTagErr?[]:PostTag;
                            var callBackInfo = { title: '十页书｜笔记',PostTag: PostTag,PostGet_all: PostGet_all,PostDate: PostDate,Create_links:Create_links};
                            fn(callBackInfo)
                        });
                    });
                });
            });
        },
        //把公用部分抽象出来
        publicByIdNoteCallBack: function (IsNote, req, res, isIf, publicUserId,blogs_ids, isTag_id,isTag2_id, BlogsByIds, fn){
            IsNote.PostTag( isIf, publicUserId,function (PostTagErr, PostTag) {
                IsNote.BlogsById(isIf, publicUserId, blogs_ids,function (BlogsByIdErr, BlogsById) {
                    BlogsById = BlogsByIdErr?[]:BlogsById;
                    BlogsByIds = BlogsById;
                    var blogs_ids_add_one = blogs_ids;
                    var title_to_content_add_one;
                    IsNote.BlogsByNext( isIf, publicUserId,blogs_ids_add_one,isTag_id,isTag2_id,function (BlogsByNextErr, BlogsByNext) {
                        BlogsByNext = BlogsByNextErr?[]:BlogsByNext;
                        var blogs_ids_reduce_one = blogs_ids;
                        var title_to_content_reduce_one;
                        title_to_content_add_one = BlogsByNext;
                        IsNote.BlogsByPrev( isIf, publicUserId,blogs_ids_reduce_one,isTag_id,isTag2_id,function (BlogsByPrevErr, BlogsByPrev) {
                            BlogsByPrev = BlogsByPrevErr?[]:BlogsByPrev;
                            title_to_content_reduce_one = BlogsByPrev;
                            var tags_open_next= 0;
                            var tags_open_prev= 0;
                            BlogsById = BlogsByIds;
                            passTitle= '十页书｜'+BlogsById[0].kt_isNote_title;
                            IsNote.PostDate( isIf, publicUserId,function (PostDateErr, PostDate) {
                                if(title_to_content_add_one.length<1){
                                    if(title_to_content_reduce_one.length<1){
                                        tags_open_prev= 1;
                                    };
                                    tags_open_next= 1;//console.log("tags_open_next");//console.log(tags_open_prev);console.log(tags_open_next);
                                    var callBackInfo = { title: passTitle,PostTag: PostTag,PostDate: PostDate,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next};
                                    fn(callBackInfo)
                                }else{
                                    if(title_to_content_reduce_one.length<1){
                                        tags_open_prev= 1;
                                    };
                                    var callBackInfo = { title: passTitle,PostTag: PostTag,PostDate: PostDate,BlogsById:BlogsById,tags_open_prev: tags_open_prev,tags_open_next: tags_open_next};
                                    fn(callBackInfo)
                                }
                            });
                        });
                    });
                });
            });
        }

    };

    module.exports = publicNote;

}).call(this);