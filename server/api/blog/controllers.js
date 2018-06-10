const { Blogs } = require('./models');
const express = require('express');
const mongoose = require('mongoose');

const blogCtrl = {
    getBlogs(req, res) {
        Blogs.getBlogs(req, res);
    },
    getBlogById(req, res) {
        Blogs.getBlogById(req, res);
    },
    createBlogPost(req, res) {
        Blogs.createBlogPost(req, res);
    },
    editBlogById(req, res) {
        Blogs.editBlogById(req, res);
    }
}

module.exports = blogCtrl;