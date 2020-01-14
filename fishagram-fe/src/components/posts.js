class Posts {
    constructor() {
        this.posts = [];
        this.postsComments = [];
        this.adapter = new PostsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadPosts()
    }

    fetchAndLoadPosts() {
        this.adapter.getPosts.then(posts => {
            posts.data.forEach(post => this.posts.push(post));
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

    createCard(data) {
        
        const postsContainer = document.getElementById('posts-container');
        
        const ul = document.createElement('ul');


        img.src = "https://via.placeholder.com/250";

        for(i = 0; i < data.length; i++) {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const div = document.createElement('div');
            const captionPara = document.createElement('p');
            const lengthPara = document.createElement('p');
            const weightPara = document.createElement('p');
            const lurePara = document.createElement('p');



        }
    }

    render() {
        const postsContainer = document.getElementById('posts-container');
        const article = document.createElement('article');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const ul = document.createElement('ul');

        img.src = "https://via.placeholder.com/250";

        article.appendChild(img);
        ul.innerHTML = `<li>Caption: ${this.posts[0].caption}</li> <li>Weight: ${this.posts[0].weight}</li> <li>Length: ${this.posts[0].length}</li> <li>Lure used: ${this.posts[0].lure_used}</li>`
        postsContainer.appendChild(article);
        postsContainer.appendChild(ul);

        
        this.fetchAndLoadPostsComments(2);
    

    }
}