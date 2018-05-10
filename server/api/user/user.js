const express = require('express');
const router = express.Router();

// テスト実装。
router.get('/:id', function (req, res) {
    const user = {
        id: req.params.id,
        name: "tanaka",
        department: "system support"
    }
    res.json(user)
});

