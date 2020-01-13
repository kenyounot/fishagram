class PostsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/posts';
    }

    get getPosts() {
        return fetch(this.baseUrl)
                .then(res => res.json())
    }
}