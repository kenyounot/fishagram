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
				if (comment.data.errors) {
					alert(`Comment not created: ${comment.data.errors}`);
				} else {
					this.pushAndRenderComments(e, comment);
				}
			});
		}
	}

	deleteComment(e) {
		const commentId = e.target.getAttribute('id').split('-')[1];
		const div = e.target.closest('div');

		this.adapter.deleteComment(commentId).then(res => {
			if (res.deleted === true) {
				this.deleteCommentAfterIdCheck(commentId);
			}

			this.renderComments(div);
		});
	}

	// Helpers
	createAndAppendComments(commentUl, div, i) {
		const li = document.createElement('li');
		li.textContent = `${this.comments[i].comment}`;
		const button = document.createElement('button');
		button.setAttribute('id', `btn-${this.comments[i].id}`);
		button.setAttribute('class', 'delete-btn');
		button.textContent = 'x';
		button.addEventListener('click', this.deleteComment.bind(this));
		li.appendChild(button);
		commentUl.append(li);

		div.appendChild(commentUl);
		this.postsContainer.appendChild(div);
	}

	deleteCommentAfterIdCheck(commentId) {
		for (let i = 0; i < this.comments.length; i++) {
			const ele = this.comments[i];

			if (ele.id == commentId) {
				this.comments.splice(i, 1);
			}
		}
	}

	commentLoopAndCreate(commentUl, div) {
		for (let i = 0; i < this.comments.length; i++) {
			this.createAndAppendComments(commentUl, div, i);
		}
	}

	ifUlExists(div) {
		let ulIndex = 0;

		for (let index = 0; index < div.childNodes.length; index++) {
			const element = div.childNodes[index];

			if (element.tagName == 'UL') {
				ulIndex = index;
			}
		}
		return ulIndex;
	}

	// Render Methods
	renderPost() {
		const article = document.createElement('article');
		article.setAttribute('data-id', `${this.postId}`);
		article.setAttribute('class', 'cards__item');

		const mainDiv = document.createElement('div');
		mainDiv.setAttribute('class', 'card');

		const contentDiv = document.createElement('div');
		contentDiv.setAttribute('class', 'card__content');

		const imageDiv = document.createElement('div');
		imageDiv.setAttribute('class', 'card__image');

		const img = document.createElement('img');
		img.src = `${this.imgUrl}`;

		const deletePostBtn = document.createElement('button');
		deletePostBtn.setAttribute('id', `post-delete-${this.postId}`);
		deletePostBtn.setAttribute('class', 'post-delete-btn btn btn--block');
		deletePostBtn.textContent = 'Delete Post';

		const captionPara = document.createElement('p');
		captionPara.classList.add('caption-p');
		captionPara.textContent = `Caption: ${this.caption}`;
		captionPara.setAttribute('class', 'card__title');

		const lengthPara = document.createElement('p');
		lengthPara.classList.add('length-p');
		lengthPara.textContent = `Length: ${this.length}`;
		lengthPara.setAttribute('class', 'card__text');

		const weightPara = document.createElement('p');
		weightPara.classList.add('weight-p');
		weightPara.textContent = `Weight: ${this.weight}`;
		weightPara.setAttribute('class', 'card__text');

		const lurePara = document.createElement('p');
		lurePara.classList.add('lure-p');
		lurePara.textContent = `Lure used: ${this.lureUsed}`;
		lurePara.setAttribute('class', 'card__text');

		const inputComment = document.createElement('input');
		inputComment.setAttribute('id', `${this.postId}`);
		inputComment.setAttribute('data-id', `${this.postId}`);
		inputComment.setAttribute('class', 'comment-input');
		inputComment.setAttribute('type', 'text');
		inputComment.placeholder = 'Add Comment';

		const hr = document.createElement('hr');

		imageDiv.appendChild(img);
		mainDiv.appendChild(imageDiv);

		mainDiv.appendChild(captionPara);
		mainDiv.appendChild(lengthPara);
		mainDiv.appendChild(weightPara);
		mainDiv.appendChild(lurePara);
		mainDiv.appendChild(deletePostBtn);
		mainDiv.appendChild(inputComment);
		mainDiv.appendChild(hr);

		article.appendChild(mainDiv);
		this.postsContainer.appendChild(article);
		this.renderComments(mainDiv);
		this.addCommentEventListener();
	}

	pushAndRenderComments(event, comment) {
		this.comments.push(comment.data.comment);

		this.renderComments(event.target.closest('div'));
		event.target.value = '';
	}

	renderComments(div) {
		if (this.ifUlExists(div)) {
			let index = this.ifUlExists(div);
			const commentUl = div.childNodes[`${index}`];
			commentUl.innerHTML = '';

			this.commentLoopAndCreate(commentUl, div);
		} else {
			const commentUl = document.createElement('ul');

			this.commentLoopAndCreate(commentUl, div);
		}
	}
}
