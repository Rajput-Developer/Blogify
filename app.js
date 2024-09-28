import express from 'express';
import dotenv from 'dotenv'
import path from 'path';
import router from './router/user.router.js';
import blogRouter from './router/blog.router.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import vaidateUserByCokkie from './middlewares/auth.middleware.js';
import { GetAllBlogs } from './controllers/blog.controller.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000

// DBConnection
async function DBConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) {
        console.log('connection error =>', err);
    }
}
DBConnection();

// MiddleWare to handle form data
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(cookieParser());
app.use(vaidateUserByCokkie('token'))

app.use(express.static(path.resolve('./public')))

app.get('/', GetAllBlogs)

app.use('/user', router)
app.use('/blog', blogRouter)


app.listen(PORT);
