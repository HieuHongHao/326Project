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
    }
}

class PostService extends CrudService{
    constructor(){
        super(posts);
        this.comments = comments;
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


const postService = new PostService();
