class Posts {
    constructor() {
        this.posts = [];
        this.postsComments = [];
        this.adapter = new PostsAdapter()
        // this.initBindingsEventListeners()
        this.fetchAndLoadPosts()
    }

    initBindingsEventListeners() {
        this.postForm = document.getElementById('new-post-form')
        
    }

    fetchAndLoadPosts() {
        this.adapter.getPosts.then(posts => {
            posts.data.forEach(post => this.posts.push(new Post(post)));
        })
        .then(() => {
            this.render()
        })
    }

    fetchAndLoadPostsComments(postId) {
        this.adapter.getPostsComments(postId)
            .then(comments => {
                console.log(comments)
            })
    }


    render() {
        this.posts.map(post => {
            post.renderPost()
        })
    }
}