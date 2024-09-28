
import User from '../models/User.model.js';

const renderSignUp = (req, res) => {
    return res.render('signUp')
}

const handleSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect('/')
}

// User SignIn function 


const handleSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPassword(email, password);
        return res.cookie('token', token).redirect('/')
    } catch (error) {
        res.render('signIn', {
            error: 'Invalid password',
        })
    }
}

// Clear Cookie 
const clearCookie = (req, res) => {
    res.clearCookie('token').redirect('/')

}

export { handleSignUp, handleSignIn, clearCookie, renderSignUp };