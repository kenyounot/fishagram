class Post {
	constructor(postJSON) {
		this.adapter = new PostsAdapter();
		this.postId = postJSON.id;
		this.caption = postJSON.caption;
		this.weight = postJSON.weight;
		this.length = postJSON.length;
		this.lureUsed = postJSON.lure_used;
		this.imgUrl = postJSON.img_url;
		this.comments = postJSON.comments || [];
		this.initBindings();
	}

	// Listeners
	addCommentEventListener() {
		this.commentInput = document.getElementById(`${this.postId}`);
		this.commentInput.addEventListener('keyup', this.createComment.bind(this));
	}

	deleteCommentEventListener() {
		let btnArr = document.querySelectorAll('.delete-btn');

		for (let i = 0; i < btnArr.length; i++) {
			const ele = btnArr[i];
			ele.addEventListener('click', this.deleteComment.bind(this));
		}
	}

	initBindings() {
		this.deleteCommentEventListener();
		this.postsContainer = document.getElementById('posts-container');
	}

	// Crud Methods
	createComment(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			const commentId = this.commentInput.getAttribute('data-id');
			const commentInputVal = this.commentInput.value;
			const formValues = { comment: commentInputVal, post_id: commentId };

			this.adapter.createComment(formValues).then(comment => {
				this.pushAndRenderComments(e, comment);
			});
		}
	}

	deleteComment(e) {
		const commentId = e.target.getAttribute('id').split('-')[1];
		const article = e.target.closest('article');

		this.adapter.deleteComment(commentId).then(res => {
			if (res.deleted === true) {
				this.deleteCommentAfterIdCheck(commentId);
			}

			this.renderComments(article);
		});
	}

	// Helpers
	createAndAppendComments(commentUl, article, i) {
		const li = document.createElement('li');
		li.textContent = `${this.comments[i].comment}`;
		const button = document.createElement('button');
		button.setAttribute('id', `btn-${this.comments[i].id}`);
		button.setAttribute('class', 'delete-btn');
		button.textContent = 'delete';
		button.addEventListener('click', this.deleteComment.bind(this));

		commentUl.append(li);
		commentUl.append(button);

		article.appendChild(commentUl);
		this.postsContainer.appendChild(article);
	}

	deleteCommentAfterIdCheck(commentId) {
		for (let i = 0; i < this.comments.length; i++) {
			const ele = this.comments[i];

			if (ele.id == commentId) {
				this.comments.splice(i, 1);
			}
		}
	}

	// Render Methods
	renderPost() {
		const article = document.createElement('article');
		article.setAttribute('data-id', `${this.postId}`);
		const img = document.createElement('img');
		img.src = `${this.imgUrl}`;
		img.setAttribute('class', 'post-image');
		const deletePostBtn = document.createElement('button');
		deletePostBtn.setAttribute('id', `post-delete-${this.postId}`);
		deletePostBtn.setAttribute('class', 'post-delete-btn');
		deletePostBtn.textContent = 'Delete Post';
		const div = document.createElement('div');
		div.setAttribute('class', 'postCard');
		const captionPara = document.createElement('p');
		captionPara.classList.add('caption-p');
		captionPara.textContent = `Caption: ${this.caption}`;
		const lengthPara = document.createElement('p');
		lengthPara.classList.add('length-p');
		lengthPara.textContent = `Length: ${this.length}`;
		const weightPara = document.createElement('p');
		weightPara.classList.add('weight-p');
		weightPara.textContent = `Weight: ${this.weight}`;
		const lurePara = document.createElement('p');
		lurePara.classList.add('lure-p');
		lurePara.textContent = `Lure used: ${this.lureUsed}`;
		const inputComment = document.createElement('input');
		inputComment.setAttribute('id', `${this.postId}`);
		inputComment.setAttribute('data-id', `${this.postId}`);
		inputComment.setAttribute('type', 'text');
		inputComment.placeholder = 'Add Comment';

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

	pushAndRenderComments(event, comment) {
		this.comments.push(comment.data.comment);

		this.renderComments(event.target.closest('article'));
		event.target.value = '';
	}

	renderComments(article) {
		if (article.childNodes[7]) {
			const commentUl = article.childNodes[7];
			commentUl.innerHTML = '';

			for (let i = 0; i < this.comments.length; i++) {
				this.createAndAppendComments(commentUl, article, i);
			}
		} else {
			const commentUl = document.createElement('ul');

			for (let i = 0; i < this.comments.length; i++) {
				this.createAndAppendComments(commentUl, article, i);
			}
		}
	}
}
