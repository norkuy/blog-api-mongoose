const { Blogs } = require('./models');
const express = require('express');
const mongoose = require('mongoose');

const blogCtrl = {
    getBlogs(req, res) {
        Blogs.getBlogs(req, res).then(blogs => {
            res.json(blogs);
        });
    }
}

module.exports = blogCtrl;