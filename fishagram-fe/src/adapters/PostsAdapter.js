class PostsAdapter {
	constructor() {
		this.baseUrl = 'http://localhost:3000/api/v1/posts';
		this.commentUrl = 'http://localhost:3000/api/v1/comments';
	}

	getPosts() {
		return fetch(this.baseUrl).then(res => res.json());
	}

	createPost(formValues) {
		const post = PostsAdapter.appendNewPostValues(formValues);
		return fetch(this.baseUrl, {
			method: 'POST',
			body: post
		}).then(res => res.json());
	}

	editPost(pValues, postId) {
		const post = {
			caption: pValues.caption,
			length: pValues.length,
			weight: pValues.weight,
			lure_used: pValues.lure_used
		};

		return fetch(`${this.baseUrl}/${postId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		}).then(res => res.json());
	}

	createComment(formValues) {
		const comment = {
			comment: formValues.comment,
			post_id: formValues.post_id
		};

		return fetch(this.commentUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(comment)
		}).then(res => res.json());
	}

	deletePost(postId) {
		return fetch(`${this.baseUrl}/${postId}`, {
			method: 'DELETE'
		}).then(res => res.json());
	}

	deleteComment(commentId) {
		return fetch(`${this.commentUrl}/${commentId}`, {
			method: 'DELETE'
		}).then(res => res.json());
	}

	static appendNewPostValues(valuesToAppend) {
		const post = new FormData();
		post.append('image', valuesToAppend.image);
		post.append('caption', valuesToAppend.caption);
		post.append('weight', valuesToAppend.weight);
		post.append('length', valuesToAppend.length);
		post.append('lure_used', valuesToAppend.lure_used);

		return post;
	}
}
