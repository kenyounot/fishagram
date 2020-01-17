class Posts {
    constructor() {
        this.posts = [];
        this.adapter = new PostsAdapter()
        this.fetchAndLoadPosts()
        this.initBindingsEventListeners()
    }

    initBindingsEventListeners() {
        this.postsContainer = document.getElementById('posts-container');

        // New post form bindings
        this.postForm = document.getElementById('new-post-form');
        this.postImage = document.getElementById('image');
        this.postCaption = document.getElementById('caption');
        this.postLength = document.getElementById('length');
        this.postWeight = document.getElementById('weight');
        this.postLureUsed = document.getElementById('lure-used');
        this.resetButton = document.getElementById('reset');
        
        this.postForm.addEventListener('submit', this.createPost.bind(this));
        
        
    }


    createPost(e) {
        e.preventDefault();

        const postImgVal = this.postImage.files[0];
        const postCapVal = this.postCaption.value;
        const postLenVal = this.postLength.value;
        const postWeiVal = this.postWeight.value;
        const postLurVal = this.postLureUsed.value;
            
        const formValues = {image: postImgVal,caption: postCapVal,length: postLenVal,weight: postWeiVal,lure_used: postLurVal}
        
        this.adapter.createPost(formValues).then(post => {
            console.log(post.data);
            this.posts.push(new Post(post.data))
            this.postForm.reset();
            this.render()
        })    
    }

    fetchAndLoadPosts() {
        this.adapter.getPosts.then(posts => {
            posts.data.forEach(post => this.posts.push(new Post(post)));
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        this.postsContainer.innerHTML = "";
        this.posts.map(post => {
            post.renderPost()
        })
    }
}