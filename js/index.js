import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { firebaseConfig } from "./firebaseconfig.js";
import { generateUUID } from "./uuid.js";
import { voiceInput } from "./voice-input.js";
import recording from "./recording.js";

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Firebaseの登録場所を指定
const dbRef = ref(db, "chat");

// HTML要素を取得
const submitButton = document.querySelector('.submit-button'); // 送信ボタン
const recordButton = document.getElementById("start_recognition");
const comment = document.querySelector('.comment-area');

// ユニークID生成
const userId = generateUUID();

//  音声乳録
recordButton.addEventListener('click', () => {
    voiceInput(comment);
});

// submit buttonを押されたら
submitButton.addEventListener('click', () => {
    recording(dbRef, userId, comment);
});
