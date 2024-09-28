
import blog from '../models/Blog.model.js'
import Comment from '../models/comment.model.js'


// Adding Blog 
const handleAddBlog = async (req, res) => {
    res.render('addBlog', {
        users: req.users,
    })
}

// handle UploadBlog 
const handleUploadBlog = async (req, res) => {
    const { title, description } = req.body;

    const BlogCreation = await blog.create({
        title,
        description,
        createdBy: req.users._id,
        coverImage: `/uploads/${req.file.filename}`
    })
    return res.render('home')
}

// Getting Blog by id or by name
const GetBlogById = async (req, res) => {
    const findBlog = await blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy');
    return res.render('Blog', {
        user: req.users,
        blogs: findBlog,
        Comments: comments
    })
}

// Get all blogs 
const GetAllBlogs = async (req, res) => {
    const allblogs = await blog.find({});
    return res.render('home', {
        users: req.users,
        blogs: allblogs
    })
}

// Comment Handler
const handleComment = async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.users._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
}




export { handleAddBlog, handleUploadBlog, GetBlogById, handleComment, GetAllBlogs }