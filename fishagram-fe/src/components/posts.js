class Posts {
    constructor() {
        this.posts = [];
        this.postsComments = [];
        this.adapter = new PostsAdapter()
        this.initBindingsEventListeners()
        this.fetchAndLoadPosts()
    }

    initBindingsEventListeners() {
        this.postForm = document.getElementById('new-post-form');

        this.postImage = document.getElementById('image');
        this.postCaption = document.getElementById('caption');
        this.postLength = document.getElementById('length');
        this.postWeight = document.getElementById('weight');
        this.postLureUsed = document.getElementById('lure-used');
        

        this.postForm.addEventListener('submit', this.createPost.bind(this));

    }

    createPost(e) {
        e.preventDefault();
        const postImgVal = this.postImage.value;
        const postCapVal = this.postCaption.value;
        const postLenVal = this.postLength.value;
        const postWeiVal = this.postWeight.value;
        const postLurVal = this.postLureUsed.value;
        
        this.adapter.createPost(value);


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