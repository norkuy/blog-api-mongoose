const express =  require('express');
const blogCtrl = require('./controllers');

const router = express.Router();

router.route('/')
    .get(blogCtrl.getBlogs);

module.exports = router;