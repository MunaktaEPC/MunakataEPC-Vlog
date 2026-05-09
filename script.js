// Firebase 設定
var firebaseConfig = {
  apiKey: "AIzaSyA-HFDNg8NsrYMzt-4LFIHug4kXIYg-vJ0",
  authDomain: "munakataepc.firebaseapp.com",
  databaseURL: "https://munakataepc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "munakataepc",
  storageBucket: "munakataepc.firebasestorage.app",
  messagingSenderId: "384658299656",
  appId: "1:384658299656:web:7f6020de2fe8345dc5aabd"
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// 投稿処理
function sendPost() {
  var name = document.getElementById("name").value;
  var message = document.getElementById("message").value;

  if (!name || !message) return;

  db.ref("posts").push({
    name: name,
    message: message,
    time: Date.now()
  });

  document.getElementById("message").value = "";
}

// 投稿一覧のリアルタイム更新
db.ref("posts").on("value", function(snapshot) {
  var posts = snapshot.val();
  var postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  for (var id in posts) {
    var p = posts[id];
    var div = document.createElement("div");
    div.innerHTML = "<strong>" + p.name + "</strong>: " + p.message;
    postsDiv.appendChild(div);
  }
});
