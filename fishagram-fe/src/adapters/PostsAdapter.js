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

    createPost(params) {
        const note = {
            body: value
        }
        return fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify({ note })
        })
    }


}