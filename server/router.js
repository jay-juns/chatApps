const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('서버 작동중');
});

module.exports = router;