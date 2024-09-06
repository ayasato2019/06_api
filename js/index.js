import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { firebaseConfig } from "./firebaseconfig.js";
import { generateUUID } from "./uuid.js";
import recording from "./recording.js";

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Firebaseの登録場所を指定
const dbRef = ref(db, "chat");

// HTML要素を取得
const submitButton = document.querySelector('.submit-button'); // 送信ボタン

const userId = generateUUID();

submitButton.addEventListener('click', () => {
    recording(dbRef, userId);
});
