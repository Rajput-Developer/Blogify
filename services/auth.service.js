import jwt from 'jsonwebtoken';

const secret = "ah$a^\/"

const generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        Image: user.Image,
        role: user.role,
    }

    const token = jwt.sign(payload, secret);
    return token;
}

const validateToken = (token) => {
    const validate = jwt.verify(token, secret);
    return validate;
}

export { generateToken, validateToken };