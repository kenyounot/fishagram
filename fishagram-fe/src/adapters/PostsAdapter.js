class PostsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/posts';
        this.commentUrl = 'http://localhost:3000/api/v1/comments'
    }

    get getPosts() {
        return fetch(this.baseUrl)
                .then(res => res.json())
    }

    getPostsComments(postId) {
        return fetch(`${this.baseUrl}/${postId}/comments`)
                .then(res => res.json())
    }

    createPost(formValues) {
     
        const post = new FormData();
        post.append('image', formValues.image);
        post.append('caption', formValues.caption);
        post.append('weight', formValues.weight);
        post.append('length', formValues.length);
        post.append('lure_used', formValues.lure_used)


        return fetch(this.baseUrl, {
            method: "POST",
            body: post
        }).then(res => res.json());
    }

    createComment(formValues) {
        const comment = {
            comment: formValues.comment,
            post_id: formValues.post_id
        }
        
        return fetch(this.commentUrl, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(comment)
        }).then(res => res.json());
    }

    deletePost(postId) {
        return fetch(`${this.baseUrl}/${postId}`, {
            method: "DELETE"
        }).then(res => res.json());
    }

    deleteComment(commentId) {
        return fetch(`${this.commentUrl}/${commentId}`, {
            method: "DELETE"
        }).then(res => res.json());
    }


}