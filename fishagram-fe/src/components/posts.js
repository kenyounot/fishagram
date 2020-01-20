class Posts {
	constructor() {
		this.posts = [];
		this.adapter = new PostsAdapter();
		this.fetchAndLoadPosts();
		this.initBindingsEventListeners();
	}

	// Listeners
	initBindingsEventListeners() {
		this.postsContainer = document.getElementById('posts-container');
		this.body = document.querySelector('body');
		// Post form bindings
		this.postForm = document.getElementById('new-post-form');
		this.postImage = document.getElementById('image');
		this.postCaption = document.getElementById('caption');
		this.postLength = document.getElementById('length');
		this.postWeight = document.getElementById('weight');
		this.postLureUsed = document.getElementById('lure-used');
		this.resetButton = document.getElementById('reset');

		this.postForm.addEventListener('submit', this.createPost.bind(this));
		this.postBlurListener();
	}

	postDeleteListener() {
		const btnArr = document.querySelectorAll('.post-delete-btn');

		for (let i = 0; i < btnArr.length; i++) {
			const ele = btnArr[i];

			ele.addEventListener('click', this.deletePost.bind(this));
		}
	}

	postEditListener() {
		const pArr = document.querySelectorAll('p');

		for (let i = 0; i < pArr.length; i++) {
			const ele = pArr[i];

			ele.addEventListener('click', e => {
				const p = e.target;

				p.contentEditable = true;
				p.focus();
			});
		}
	}

	postBlurListener() {
		this.body.addEventListener('blur', this.editPost.bind(this), true);
	}

	// Crud Methods
	createPost(e) {
		e.preventDefault();

		const postImgVal = this.postImage.files[0];
		const postCapVal = this.postCaption.value;
		const postLenVal = this.postLength.value;
		const postWeiVal = this.postWeight.value;
		const postLurVal = this.postLureUsed.value;

		const formValues = {
			image: postImgVal,
			caption: postCapVal,
			length: postLenVal,
			weight: postWeiVal,
			lure_used: postLurVal
		};

		this.adapter.createPost(formValues).then(post => {
			if (post.errors) {
				alert(`Failed to create post: ${post.errors}`);
			} else {
				this.posts.push(new Post(post.data));
				this.postForm.reset();
				this.render();
			}
		});
	}

	deletePost(e) {
		const postId = e.target.getAttribute('id').split('-')[2];

		this.adapter.deletePost(postId).then(res => {
			if (res.deleted === true) {
				this.deletePostAfterIdCheck(postId);
			} else {
				alert(`Post wasn't deleted: ${res.errors}`);
			}
			this.render();
		});
	}

	editPost(e) {
		if (e.target.tagName === 'P') {
			const article = e.target.closest('article');
			const postId = article.getAttribute('data-id');
			const captionP = Posts.getParTextContent(
				article.querySelector('.caption-p')
			);
			const lengthP = Posts.getParTextContent(
				article.querySelector('.length-p')
			);
			const weightP = Posts.getParTextContent(
				article.querySelector('.weight-p')
			);
			const lureP = Posts.getParTextContent(article.querySelector('.lure-p'));

			const pValues = {
				caption: captionP,
				length: lengthP,
				weight: weightP,
				lure_used: lureP
			};

			this.adapter.editPost(pValues, postId).then(res => {
				if (res.errors) {
					alert(`Post couldn't be updated: ${res.errors}`);
					this.render();
				}
			});
		}
	}
	// Helpers
	static getParTextContent(targetP) {
		return targetP.textContent.split(':')[1].trim();
	}

	deletePostAfterIdCheck(postId) {
		for (let i = 0; i < this.posts.length; i++) {
			const ele = this.posts[i];
			if (ele.postId == postId) {
				this.posts.splice(i, 1);
			}
		}
	}

	// Render Methods
	fetchAndLoadPosts() {
		this.adapter
			.getPosts()
			.then(posts => {
				posts.data.forEach(post => this.posts.push(new Post(post)));
			})
			.then(() => {
				this.render();
			});
	}

	render() {
		this.postsContainer.innerHTML = '';
		this.posts.map(post => {
			post.renderPost();
		});

		this.postDeleteListener();
		this.postEditListener();
	}
}
