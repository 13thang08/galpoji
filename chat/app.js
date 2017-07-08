var http = require("http");
var translate = require('google-translate-api');

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

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

  // 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
  socket.on("connected", function (name) {
    var msg = name + "が入室しました";
    userHash[socket.id] = name;
    io.sockets.emit("publish", {value: msg});
  });

  // メッセージ送信カスタムイベント
  socket.on("publish", function (data) {
    console.log(data.value);
    http.get("http://gal.koneta.org/gal.cgi?input=" + encodeURIComponent(data.value), function(res) {
      res.setEncoding('utf-8');
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        console.log(body);
        io.sockets.emit("publish", {value:data.user + body});
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    }); 
    //io.sockets.emit("publish", {value:data.value});
  });

  // メッセージ送信カスタムイベント
  socket.on("publish-vietnamese", function (data) {
    translate(data.value, {from: 'ja', to: 'vi'}).then(res => {
      console.log(res.text);
      io.sockets.emit("publish", {value:data.user + res.text});
    }).catch(err => {
      console.error(err);
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
