const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// postの前準備。expressはそのままではリクエストのbodyをパースできないため。
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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

// POST method route
router.post('/', function (req, res) {

    console.log(req.body); // 後で消す    
    const reqRows = req.body; // リクエストのjson配列
    let affectedRowNum = 0;
    reqRows.forEach(el => {
        pool.query({
            sql: 'SELECT * FROM todo_lists WHERE id = ?',
            values: [el.id] // ここでバインド
        }, function (error, rows, fields) {
            
            if (error) {
                // 見つからなかったので新しいレコードとして登録
                console.log(el + 'new');
                affectedRowNum += insertTodoList(el);
            } else {
                // 既存レコードを更新
                console.log(el + 'update');
                affectedRowNum += updateTodoList(el);
            };
            
        });
    }, function () {
        res.send(affectedRowNum);
    });
    
});

async function insertTodoList(todoRow) {
    pool.query({
        sql: 'INSERT INTO todo_lists(task_name,description,status) VALUES(?,?,?)',
        values: [todoRow.task_name, todoRow.description, todoRow.status] // ここでバインド
    }, function (error, rows, fields) {
        if (error) throw error;
        return rows.changedRows;
    });
}

async  function updateTodoList(todoRow) {
    pool.query({
        sql: 'UPDATE todo_lists SET task_name = ?, description = ?, status = ? WHERE id = ?',
        values: [todoRow.task_name, todoRow.description, todoRow.status, todoRow.id] // ここでバインド
    }, function (error, rows, fields) {
        if (error) throw error;
        return rows.changedRows;
    });
}

module.exports = router;