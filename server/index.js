// Heroku用に作成
const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// api
const todolist = require('./routes/todolist')
const user = require('./routes/user')

// postの前準備。expressはそのままではリクエストのbodyをパースできないため。
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 静的リソースの圧縮をgzipで行う。圧縮レベルはzlibのデフォルトの6。
app.use(compression());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/../dist'));

// Start the app by listening on the default
// Heroku port
const port = process.env.PORT || 8080;
app.listen(port);

// API実装
app.use('/todolist', todolist);
app.use('/user', user); // テスト実装

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

console.log(`Server listening on ${port}`);