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
        Blog
        .find()
        .then(blogs => {
           res.json({blogs: blogs.map(blog => blog.serialize())});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({message: 'Internal server error'});
        });
    },
    getBlogById(req, res) {
                Blog
                .findById(req.params.id)
                .then(blog => {
                    res.json(blog.serialize());
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({message: 'Internal server error'});
                });
    },
    createBlogPost(req, res) {
        const requiredKeys = ['title', 'author', 'content'];
        const authorKeys = ['firstName', 'lastName'];
        const missingValues = [];
        const requestBody = req.body;
        let currentKey;
        
        for (let i = 0; i < requiredKeys.length; i++) {
            if (!(requiredKeys[i] in requestBody)) {
                missingValues.push(requiredKeys[i]);
            }
        }

        if ('author' in requestBody) {
            for (let i = 0; i < authorKeys.length; i++) {
                if (!(authorKeys[i] in requestBody.author)) {
                    missingValues.push(requiredKeys[i]);
                }
            }
        } else {
            missingValues.push('firstName');
            missingValues.push('lastName');
        }

        if (missingValues.length) {
            console.log('Missing values', missingValues);
            return res.json({message: `Request body is missing the following key(s): ${missingValues}`});
        }
        const newBlogPost = {
            title: requestBody.title,
            author: {
                firstName: requestBody.author.firstName,
                lastName: requestBody.author.lastName
            },
            content: req.body.content
        }
        return Blog
                .create(newBlogPost)
                .then(blog => {
                    res.json(blog);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({message: 'Internal server error'});
                });
      },
      editBlogById(req, res) {

      }
}


module.exports = { Blog, Blogs };
