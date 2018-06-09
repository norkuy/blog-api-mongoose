const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    content: {type: String, required: true}
});

blogSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`;
});

blogSchema.methods.serialize = function() {
    return {
        title: this.title,
        author: this.authorName,
        content: this.content
    };
}

const Blog = mongoose.model('Blogs', blogSchema);

const Blogs = {
    getBlogs(req, res) {
        return Blog
                .find()
                .then(blogs => {
                  return {blogs: blogs.map(blog => blog.serialize())};
                })
        .catch(err => {
          console.log(err);
          res.status(500).json({message: 'Internal server error'});
        });
    }
}


module.exports = { Blog, Blogs };
