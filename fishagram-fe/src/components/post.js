class Post {
    constructor(postJSON) {
        this.adapter = new PostsAdapter()
        this.postId = postJSON.id;
        this.caption = postJSON.caption;
        this.weight = postJSON.weight;
        this.length = postJSON.length;
        this.lureUsed = postJSON.lure_used;
        this.imgUrl = postJSON.img_url
        this.comments = postJSON.comments || [];
        this.initBindings()
    }


    addCommentEventListener() {
        this.commentInput = document.getElementById(`${this.postId}`);
        this.commentInput.addEventListener('keyup', this.createComment.bind(this));
    }



    deleteCommentEventListener() {
        let btnArr = document.querySelectorAll('.delete-btn');

        for(let i = 0; i < btnArr.length; i++){
            const ele = btnArr[i];
            ele.addEventListener('click', this.deleteComment.bind(this));
        }
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

    deleteComment(e) {
        const commentId = e.target.getAttribute('id').split('-')[1];
        const article = e.target.closest('article');

        this.adapter.deleteComment(commentId).then((res) => {
            if(res.deleted === true){
                for(let i = 0; i < this.comments.length; i++) {
                    const ele = this.comments[i];            
                    
                    if(ele.id == commentId){
                        this.comments.splice(i, 1);
                    }
                }
            }

            this.renderComments(article);
        })
    }

    initBindings() {
        this.postsContainer = document.getElementById('posts-container');
    }

    renderPost() {
    
        const article = document.createElement('article');
            article.setAttribute('data-id', `${this.postId}`);
            const img = document.createElement('img');
            const deletePostBtn = document.createElement('button');
                deletePostBtn.setAttribute('id', `post-delete-${this.postId}`);
                deletePostBtn.setAttribute('class', 'post-delete-btn')
                deletePostBtn.textContent = "Delete Post";
        
            const div = document.createElement('div');
                div.setAttribute('class', 'postCard');
            const captionPara = document.createElement('p');
                captionPara.classList.add('caption-p')
            const lengthPara = document.createElement('p');
                lengthPara.classList.add('length-p');
            const weightPara = document.createElement('p');
                weightPara.classList.add('weight-p');
            const lurePara = document.createElement('p');
                lurePara.classList.add('lure-p');
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

            article.appendChild(img);
            article.appendChild(deletePostBtn);
            article.appendChild(captionPara);
            article.appendChild(lengthPara);
            article.appendChild(weightPara);
            article.appendChild(lurePara);
            article.appendChild(inputComment);
            
            div.appendChild(article);
            this.postsContainer.appendChild(div);
            this.renderComments(article);
            this.addCommentEventListener();
    }

    renderComments(article) {
        if(article.childNodes[7]) {
            const commentUl = article.childNodes[7];
            commentUl.innerHTML = "";
            for(let i = 0; i < this.comments.length; i++){
                const li = document.createElement('li');
                    li.textContent = `${this.comments[i].comment}`;
                const button = document.createElement('button');
                    button.setAttribute('id', `btn-${this.comments[i].id}`)
                    button.setAttribute('class', 'delete-btn');
                    button.textContent = "delete";

                commentUl.appendChild(li);
                commentUl.appendChild(button);
            }
            article.appendChild(commentUl);
            this.postsContainer.appendChild(article);
            this.deleteCommentEventListener();
        }else {
            const commentUl = document.createElement('ul');
                for(let i = 0; i < this.comments.length; i++){
                    const li = document.createElement('li');
                        li.textContent = `${this.comments[i].comment}`;
                    const button = document.createElement('button');
                        button.setAttribute('id', `btn-${this.comments[i].id}`)
                        button.setAttribute('class', 'delete-btn')
                        button.textContent = "delete";
                        
                    commentUl.appendChild(li);
                    commentUl.appendChild(button);
                }
       
            article.appendChild(commentUl);
            this.postsContainer.appendChild(article);
            
            this.deleteCommentEventListener();
        }
    }

}    