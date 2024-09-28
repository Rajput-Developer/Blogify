import express from 'express';
import { clearCookie, handleSignIn, handleSignUp, renderSignUp } from '../controllers/user.controller.js';

const router = express.Router();


router.get('/signUp', renderSignUp)

router.get('/signIn', (req, res) => {
    return res.render('signIn');
})

router.post('/signUp', handleSignUp)

// SignIn router

router.post('/signIn', handleSignIn)

// logout router

router.get('/logout', clearCookie)

export default router;