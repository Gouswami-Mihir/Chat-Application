var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

router.post('/', async (req, res) => {
  
});

module.exports = router;
