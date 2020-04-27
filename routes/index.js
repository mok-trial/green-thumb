const { Router } = require('express');
const router = new Router();
const { join } = require('path');

router.get('/', (req, res, next) => {
  res.sendFile(join(__dirname, '../views', 'index.html'));
});

module.exports = router;
