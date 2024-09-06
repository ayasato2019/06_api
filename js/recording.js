import { push, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

function recording(dbRef) {
	const newComment = commentArea.value;  // 入力されたコメントを取得

	if (newComment.trim() !== '') {
		const newCommentRef = push(dbRef);  // Firebaseに新しいコメントをプッシュ
		set(newCommentRef, {
			comment: newComment,
			timestamp: Date.now()
		});

		commentArea.value = '';  // 入力フィールドをクリア
	}
}
