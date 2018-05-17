const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// JAWSDB_URLはJAWSDBを入れた時にHeroku側でデフォルトで作られるNodeの環境変数。
// そいつの中に接続情報が入ってる。
const pool = mysql.createPool(process.env.JAWSDB_URL + '?connectionLimit=100' + '?debug=false');

pool.getConnection(function (err, connection) {
    if (err) {
        console.log("MYSQL CONNECTION ERROR!" + err);
        throw err;
    }
});

router.get('/', function (req, res) {
    pool.query('select * from todo_lists', function (err, rows) {
        res.render('todo_lists', { todo_lists: rows });
    });
})

module.exports = router;