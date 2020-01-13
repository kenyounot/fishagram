class Posts {
    constructor() {
        this.notes = [];
        this.adapter = new PostsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadPosts()
    }

    fetchAndLoadPosts() {
        this.adapter.getPosts.then(posts => {
            console.log(posts);
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        
    }
}