const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// postの前準備。expressはそのままではリクエストのbodyをパースできないため。
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// JAWSDB_URLはJAWSDBを入れた時にHeroku側でデフォルトで作られるNodeの環境変数。
// そいつの中に接続情報が入ってる。
// multipleStatementsはUpdateなどを一括実行するため追加。
var pool = mysql.createPool(process.env.JAWSDB_URL + '?multipleStatements=true');

pool.on('connection', function onConnection(connection) {
    connection.query('SET time_zone = ?', 'Asia/Tokyo');
});

// 一括で取得する
router.get('/', function (req, res) {
    const query = 'SELECT * FROM todo_lists WHERE is_deleted = 0';
    pool.query(query, function (error, rows, fields) {
        if (error) throw error;
        res.json(rows);
    });
});

// 更新。InsertとUpdateを同時に行う。
router.post('/', function (req, res) {
    const reqRows = req.body; // リクエストのjson配列
    const query = 'SELECT * FROM todo_lists';
    pool.query(query, async function (error, dbRows, fields) {
        //dbRowsにはDB取得結果がガサっと入ってる。
        if (error) throw error;
        const reqRowsForInsert = [];
        const reqRowsForUpdate = [];
        reqRows.forEach(reqRow => {
            // テーブルにidある？
            const dbRow = dbRows.filter(dbRow => dbRow.id == reqRow.id)
            if (JSON.stringify(dbRow) == JSON.stringify([])) {
                // 新規用配列
                reqRowsForInsert.push(reqRow);
            } else {
                // 更新用配列
                reqRowsForUpdate.push(reqRow);
            };
        });
        const insertNum = await insertTodoList(reqRowsForInsert); // 新規登録処理
        const updateNum = await updateTodoList(reqRowsForUpdate); // 更新処理
        res.json({
            'insertNum': insertNum,
            'updateNum': updateNum
        });
    });
});

// 削除
router.delete('/:id', function (req, res) {
    const reqId = req.params.id;
    const param = [reqId];
    const query = mysql.format('UPDATE todo_lists SET is_deleted = 1 WHERE id = ?;', param);
    pool.query(query, async (error, result, fields) => {
        if (error) throw error;
        const deletedNum = result.affectedRows;
        res.json({
            'deletedNum': deletedNum
        });
    });
});

async function insertTodoList(rows) {
    return new Promise((resolve, reject) => {
        if (JSON.stringify(rows) == JSON.stringify([])) return resolve(0);
        const params = []; // バインド用パラメータを格納。配列として挿入することで複数行の場合に対応する。
        rows.forEach(row => {
            params.push([row.task_name, row.description, row.status]);
        });

        let queries = '';
        params.forEach(param => {
            queries += mysql.format('INSERT INTO todo_lists(task_name,description,status) VALUES (?, ?, ?);', param);
        });

        pool.query(queries, (error, rows, fields) => {
            if (error) reject(error);
            if (!Array.isArray(rows)) { rows = [rows]; }// 1個だけしか帰ってこないときは配列じゃないので無理やり配列にする。
            let affectedRowsNum = 0;
            rows.forEach(row => {
                affectedRowsNum += row.affectedRows;
            });
            return resolve(affectedRowsNum);
        });
    });
}

async function updateTodoList(rows) {
    return new Promise((resolve, reject) => {
        if (JSON.stringify(rows) == JSON.stringify([])) return resolve(0);
        const params = []; // バインド用パラメータを格納。配列として挿入することで複数行の場合に対応する。
        rows.forEach(row => {
            params.push([row.task_name, row.description, row.status, row.id]);
        });

        let queries = '';
        params.forEach(param => {
            queries += mysql.format('UPDATE todo_lists SET task_name = ?, description = ?, status = ? WHERE id = ?;', param);
        });

        pool.query(queries, (error, rows, fields) => {
            let changedRowsNum = 0;
            if (error) reject(error);
            rows.forEach(row => {
                changedRowsNum += row.changedRows;
            });
            return resolve(changedRowsNum);
        });
    });
}

module.exports = router;
