const express =  require('express');
const blogCtrl = require('./controllers');

const router = express.Router();

router.route('/')
    .get(blogCtrl.getBlogs)
    .post(blogCtrl.createBlogPost);

router.route('/:id')
    .get(blogCtrl.getBlogById)
    .put(blogCtrl.editBlogById);
    



module.exports = router;