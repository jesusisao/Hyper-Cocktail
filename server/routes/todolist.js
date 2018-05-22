const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// JAWSDB_URLはJAWSDBを入れた時にHeroku側でデフォルトで作られるNodeの環境変数。
// そいつの中に接続情報が入ってる。
var pool = mysql.createPool(process.env.JAWSDB_URL);

router.get('/', function (req, res) {
    const query = 'SELECT * FROM todo_lists';
    pool.query(query, function (error, rows, fields) {
        if (error) throw error;
        res.json(rows)
    });
});

module.exports = router;