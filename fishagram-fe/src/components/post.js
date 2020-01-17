class Post {
    constructor(postJSON) {
        this.adapter = new PostsAdapter()
        this.postId = postJSON.id;
        this.caption = postJSON.caption;
        this.weight = postJSON.weight;
        this.length = postJSON.length;
        this.lureUsed = postJSON.lure_used;
        this.imgUrl = postJSON.img_url
        this.comments = postJSON.comments
        this.initBindings()
    }


    addCommentEventListener() {
        this.commentInput = document.getElementById(`${this.postId}`);
        this.commentInput.addEventListener('keyup', this.createComment.bind(this));
    }

    createComment(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            const commentId = this.commentInput.getAttribute('data-id');
            let commentInputVal = this.commentInput.value;
           
            const formValues = {comment: commentInputVal,post_id: commentId }

            this.adapter.createComment(formValues).then((comment) => {
                this.comments.push(comment.data.comment);
                this.renderComments(e.target.closest('article'));
                e.target.value = "";
            });
        }
    }

    initBindings() {
        this.postsContainer = document.getElementById('posts-container');
    }

    renderPost() {
        // const commentUl = document.createElement('ul');
        const article = document.createElement('article');
            article.setAttribute('data-id', `${this.postId}`);
            const img = document.createElement('img');
            const div = document.createElement('div');
                div.setAttribute('class', 'postCard');
            const captionPara = document.createElement('p');
            const lengthPara = document.createElement('p');
            const weightPara = document.createElement('p');
            const lurePara = document.createElement('p');
            const inputComment = document.createElement('input');
                inputComment.setAttribute('id', `${this.postId}`)
                inputComment.setAttribute('data-id', `${this.postId}`)
                inputComment.setAttribute('type', 'text');
                inputComment.placeholder = "Add Comment";
            
            img.src = `${this.imgUrl}`;
            img.setAttribute('class', 'post-image');
            captionPara.textContent = `Caption: ${this.caption}`;
            lengthPara.textContent = `Length: ${this.length}`;
            weightPara.textContent = `Weight: ${this.weight}`;
            lurePara.textContent = `Lure used: ${this.lureUsed}`;

            // if (this.comments){
            //     commentUl.innerHTML = this.comments.map((comment) => {
            //         return `<li>${comment.comment}</li>`
            //     }).join('');
            // }
            

            article.appendChild(img);
            article.appendChild(captionPara);
            article.appendChild(lengthPara);
            article.appendChild(weightPara);
            article.appendChild(lurePara);
            article.appendChild(inputComment);
            // article.appendChild(commentUl);

            div.appendChild(article);
            this.postsContainer.appendChild(div);
            this.renderComments(article);
            this.addCommentEventListener();
    }

    renderComments(article) {
        if(article.childNodes[6]) {
            const commentUl = article.childNodes[6];

            if (this.comments){
                commentUl.innerHTML = this.comments.map((comment) => {
                    return `<li>${comment.comment}</li>`
                }).join('');
            }
            article.appendChild(commentUl);
            this.postsContainer.appendChild(article);
        }else {
            const commentUl = document.createElement('ul');

            if (this.comments){
                commentUl.innerHTML = this.comments.map((comment) => {
                    return `<li>${comment.comment}</li>`
                }).join('');
            }
            article.appendChild(commentUl);
            this.postsContainer.appendChild(article);
        }
    }

}    