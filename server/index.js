// Heroku用に作成
const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mysql = require("mysql");
const md5 = require('MD5');

function REST() {
    const self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function () {
    const self = this;
    const pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'db user name',
        password: 'db password',
        database: 'Test',
        debug: false
    });
    pool.getConnection(function (err, connection) {
        if (err) {
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function (connection) {
    const self = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const router = express.Router();
    app.use('/api', router);
    const rest_router = new rest(router, connection, md5);
    self.startServer();
}

// 静的リソースの圧縮をgzipで行う。圧縮レベルはzlibのデフォルトの6。
app.use(compression());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/../dist'));

// Start the app by listening on the default
// Heroku port
app.listen(port);

// API実装テスト
app.get('/api/:id', function (req, res) {
    let user = {
        id: req.params.id,
        name: "tanaka",
        department: "system support"
    }
    res.json(user);
});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

console.log(`Server listening on ${port}`);