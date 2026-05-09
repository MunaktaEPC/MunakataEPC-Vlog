// Firebase CDN モジュール版
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// あなたの Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyA-HFDNg8NsrYMzt-4LFIHug4kXIYg-vJ0",
  authDomain: "munakataepc.firebaseapp.com",
  databaseURL: "https://munakataepc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "munakataepc",
  storageBucket: "munakataepc.firebasestorage.app",
  messagingSenderId: "384658299656",
  appId: "1:384658299656:web:7f6020de2fe8345dc5aabd"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 投稿処理（HTML から呼べるように window に登録）
window.postMessage = function () {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  push(ref(db, "posts"), {
    name: name,
    message: message,
    time: Date.now()
  });

  document.getElementById("message").value = "";
};

// 投稿一覧のリアルタイム更新
onValue(ref(db, "posts"), (snapshot) => {
  const posts = snapshot.val();
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  for (let id in posts) {
    const p = posts[id];
    const div = document.createElement("div");
    div.innerHTML = `<strong>${p.name}</strong>: ${p.message}`;
    postsDiv.appendChild(div);
  }
});
