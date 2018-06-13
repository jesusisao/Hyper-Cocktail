const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// postの前準備。expressはそのままではリクエストのbodyをパースできないため。
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// JAWSDB_URLはJAWSDBを入れた時にHeroku側でデフォルトで作られるNodeの環境変数。
// そいつの中に接続情報が入ってる。
// multipleStatementsはUpdateを一括実行するため追加。
var pool = mysql.createPool(process.env.JAWSDB_URL + '?multipleStatements=true');

// 一括で取得する
router.get('/', function (req, res) {
    const query = 'SELECT * FROM todo_lists';
    pool.query(query, function (error, rows, fields) {
        if (error) throw error;
        res.json(rows)
    });
});

// 更新。InsertとUpdateを同時に行う。
router.post('/', function (req, res) {
    const reqRows = req.body; // リクエストのjson配列
    const query = 'SELECT * FROM todo_lists';
    pool.query(query, async function (error, dbRows, fields) {
        //dbRowsにはDB取得結果がガサっと入ってる。
        if (error) throw error;
        let affectedRowNum = 0;
        const reqRowsForInsert = [];
        const reqRowsForUpdate = [];
        reqRows.forEach(reqRow => {
            // テーブルにidある？
            const row = dbRows.filter(row => row.id == reqRow.id)
            if (JSON.stringify(row) == JSON.stringify([])) {
                // 見つからなかったので新しいレコードとして登録
                reqRowsForInsert.push(reqRow);
            } else {
                // 既存レコードを更新
                reqRowsForUpdate.push(reqRow);
            };
        })
        await insertTodoList(reqRowsForInsert);
        await updateTodoList(reqRowsForUpdate);
    });
});

async function insertTodoList(rows) {
    const params = []; // バインド用パラメータを格納。配列として挿入することで複数行の場合に対応する。
    rows.forEach(row => {
        params.push([row.task_name, row.description, row.status]);
    });
    console.log(params);
    pool.query({
        sql: `INSERT INTO todo_lists(task_name,description,status) VALUES ? `,
        values: params
    }, function (error, rows, fields) {
        if (error) throw error;
        return Promise.resolve(rows.changedRows);
    });
}

async function updateTodoList(rows) {
    const params = []; // バインド用パラメータを格納。配列として挿入することで複数行の場合に対応する。
    rows.forEach(row => {
        params.push([row.task_name, row.description, row.status, row.id]);
    });
    console.log(params);

    // update文生成。デフォルトだとbulk updateをサポートしていないため。
    let queries = '';
    params.forEach(param => {
        queries += mysql.format('UPDATE todo_lists SET task_name = ?, description = ?, status = ? WHERE id = ?;', param);
    });

    pool.query(queries, function (error, rows, fields) {
        if (error) throw error;
        return Promise.resolve(rows.changedRows);
    });
}

module.exports = router;