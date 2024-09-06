import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { firebaseConfig } from "./firebaseconfig.js";
import generateUUID from "./recording.js";
import recording from "./recording.js";


// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Firebaseの登録場所を指定
const dbRef = ref(db, "chat");

// HTML要素を取得
const submitButton = document.querySelector('.submit-button'); // 送信ボタン

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const userId = generateUUID();


submitButton.addEventListener('click', () => {
    recording(dbRef, userId)
});
