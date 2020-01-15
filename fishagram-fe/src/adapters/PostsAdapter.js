class PostsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/posts';
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

        })
    }


}