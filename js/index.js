import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { firebaseConfig } from "./firebaseconfig.js";

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Firebaseの登録場所を指定
const dbRef = ref(db, "chat");

// HTML要素を取得
const submitButton = document.querySelector('.submit-button'); // 送信ボタン
const commentWrap = document.querySelector('.comment-wrap'); // コメントリストのラッパー

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const userId = generateUUID();


submitButton.addEventListener('click', () => {
    const comment = document.querySelector('.comment-area');

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
});
