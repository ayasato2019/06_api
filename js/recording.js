import { push, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";


export default function recording(dbRef, userId, comment) {
	const commentWrap = document.querySelector('.comment-wrap'); // コメントリストのラッパー

	var commentItem = {
		comment: comment.value,
		user: userId,
	};

	// Firebaseへ追加
	const newPostRef = push(dbRef);
	set(newPostRef, commentItem);

	// 既存のアイテムをクリア
	commentWrap.innerHTML = '';

	// データベースをフロントに表示
	onValue(dbRef, (snapshot) => {
		const comments = snapshot.val();
		
		if (comments) {            
			Object.entries(comments).forEach(([key, commentItem]) => {
				if (commentItem.user === userId) {
					const newItem = document.createElement('li');    
					newItem.classList.add('comment-item', 'jibun');
					newItem.innerHTML = `
					<p class="comment-text aite-comment">${commentItem.comment}</p>
					<img class="comment-icon" src="./images/img-user-02.png" alt="User Icon" width="374" height="400" />
					`;
					commentWrap.appendChild(newItem);
				} else {
					const newItem = document.createElement('li');    
					newItem.classList.add('comment-item', 'aite');
					newItem.innerHTML = `
					<img class="comment-icon" src="./images/img-user-01.png" alt="User Icon" width="374" height="400" />
					<p class="comment-text">${commentItem.comment}</p>
					`;
					commentWrap.appendChild(newItem);
				}
			});
		}
	});
}

