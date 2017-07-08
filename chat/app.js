var http = require("http");

// 1.モジュールオブジェクトの初期化
var fs = require("fs");
var server = require("http").createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);
}).listen(8080);
var io = require("socket.io").listen(server);

// ユーザ管理ハッシュ
var userHash = {};
var userList = {};

var index = 0;

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

  // 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
  socket.on("connected", function (name) {
    index++;
    var msg = "ユーザー" + index + "が入室しました";
    userHash[socket.id] = name;
    userList[socket.id] = "ユーザー" + index;
    io.sockets.emit("publish", {value: msg});
  });

  // メッセージ送信カスタムイベント
  socket.on("publish", function (data) {
    http.get("http://gal.koneta.org/gal.cgi?input=" + encodeURIComponent(data.value), function(res) {
      console.log(socket.id);
      res.setEncoding('utf-8');
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        io.sockets.emit("publish", {value:body, name:data.name, user:userList[socket.id]});
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  });

  // 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
  socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      var msg = userHash[socket.id] + "が退出しました";
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: msg});
    }
  });
});
