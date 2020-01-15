class Post {
    constructor(postJSON) {
        this.adapter = new PostsAdapter()
        this.caption = postJSON.caption;
        this.weight = postJSON.weight;
        this.length = postJSON.length;
        this.lureUsed = postJSON.lure_used;
        this.img_url = post.JSON.img_url
        this.comments = this.fetchAndLoadPostsComments(postJSON.id);
        this.initBindings()
    }

    initBindings() {
        this.postsContainer = document.getElementById('posts-container');
        this.ul = document.createElement('ul');
    }


    renderPost() {
        const article = document.createElement('article');
            const img = document.createElement('img');
                img.src = "https://via.placeholder.com/450";
            const div = document.createElement('div');
                div.setAttribute('class', 'postCard')
            const captionPara = document.createElement('p');
            const lengthPara = document.createElement('p');
            const weightPara = document.createElement('p');
            const lurePara = document.createElement('p');
            const addButton = document.createElement('button');
                addButton.setAttribute('class', 'add-comment-btn');
                addButton.textContent = "Add Comment";
            const viewButton = document.createElement('button');
                viewButton.setAttribute('class', 'view-comment-btn');
                viewButton.textContent = "View Comments";
            
            captionPara.textContent = `Caption: ${this.caption}`;
            lengthPara.textContent = `Length: ${this.length}`;
            weightPara.textContent = `Weight: ${this.weight}`;
            lurePara.textContent = `Lure used: ${this.lureUsed}`;

            article.appendChild(img);
            article.appendChild(captionPara);
            article.appendChild(lengthPara);
            article.appendChild(weightPara);
            article.appendChild(lurePara);
            article.appendChild(addButton);
            article.appendChild(viewButton);

            div.appendChild(article);
            this.postsContainer.appendChild(div);
    }

    fetchAndLoadPostsComments(postId) {
        this.adapter.getPostsComments(postId)
            .then(comments => {
                return comments;
            })
    }
}    