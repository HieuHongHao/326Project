let {users,comments,posts,canvases} = require("./data_gen_script");

class CrudService{
    constructor(data){
        this.data = data;
    }
    findById(id){
        return this.data[id];
    }
    find(){
        return this.data;
    }
    findByIdAndUpdate(id,update){
        this.data[id] = {...this.data[id],...update};
    }
    insert(newObject){
        this.data.push(newObject);
    }
    delete(id){
        delete this.data[id];
    }
}


class UserService extends CrudService{
    constructor(){
        super(users);
        this.posts = posts;
    }
    getAllposts(user_id){
        const post_ids = new Set(this.data[user_id].posts);
        let res = [];
        for(const post of this.posts){
            if(post_ids.has(post.id)){
                res.push(post);
            }
        }
        return post;
    }
}


class PostService extends CrudService{
    constructor(){
        super(posts);
        this.comments = comments;
        this.counter = 100;
    }
    getAllComments(post_id){
        const comments_id = new Set(this.data[post_id].commentsId);
        let res = [];
        for(const comment of this.comments){
            if(comments_id.has(comment.id)){
                res.push(comment);
            }
        }
        return res;
    }
}

class CommentService extends CrudService{
    constructor(){
        super(comments);
    }
}
class CanvasService extends CrudService{
    constructor(){
        super(canvases);
    }
}


module.exports = {
    PostService,
    UserService,
    CommentService,
    CanvasService
}
