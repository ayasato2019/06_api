export function voiceInput(comment) {
	console.log(comment);
// ブラウザの互換性を考慮
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert('このブラウザは音声認識に対応していません');
        return;
    }
    // 音声認識のインスタンスを作成
    const recognition = new SpeechRecognition();

    // 認識結果を取得する処理
    recognition.onresult = (event) => {
        const result_voice = event.results[0][0].transcript;  // 音声認識結果
        comment.value = result_voice;  // 結果を input 要素に入れる
    };

    // 音声認識を開始
    recognition.start();

}