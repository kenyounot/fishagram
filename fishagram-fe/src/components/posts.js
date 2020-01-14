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


        for(let i = 0; i < data.length; i++) {
            const article = document.createElement('article');
            const img = document.createElement('img');
                img.src = "https://via.placeholder.com/250";
            const div = document.createElement('div');
                div.setAttribute('class', 'postCard')
            const captionPara = document.createElement('p');
            const lengthPara = document.createElement('p');
            const weightPara = document.createElement('p');
            const lurePara = document.createElement('p');
            const commentButton = document.createElement('button');
                commentButton.setAttribute('class', 'comment-btn');
                commentButton.textContent = "View Comments";
            
            captionPara.textContent = `Caption: ${data[i].caption}`;
            lengthPara.textContent = `Length: ${data[i].length}`;
            weightPara.textContent = `Weight: ${data[i].weight}`;
            lurePara.textContent = `Lure used: ${data[i].caption}`;

            article.appendChild(img);
            article.appendChild(captionPara);
            article.appendChild(lengthPara);
            article.appendChild(weightPara);
            article.appendChild(lurePara);
            article.appendChild(commentButton);
            div.appendChild(article);
            postsContainer.appendChild(div);
        }
    }

    render() {
        this.createCard(this.posts);
    }
}