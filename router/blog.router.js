import express from 'express';
import multer from 'multer';
import path from 'path'
import { GetBlogById, handleAddBlog, handleComment, handleUploadBlog } from '../controllers/blog.controller.js';

const blogRouter = express.Router();

// Multer code 
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueKey = Date.now() + Math.floor(Math.random() * 10);
        return cb(null, uniqueKey + "-" + file.originalname)
    }
})

const uploads = multer({ storage: diskStorage })

// addBlog Page
blogRouter.get('/add-new', handleAddBlog)

// Uploading a blog
blogRouter.post('/', uploads.single('coverImage'), handleUploadBlog)


// Get Blog by id or name 
blogRouter.get('/:id', GetBlogById)

// comment Router 
blogRouter.post('/comment/:blogId', handleComment)


export default blogRouter;