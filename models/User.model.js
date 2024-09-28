import { Schema, model } from 'mongoose';
import { createHmac, hash, randomBytes } from 'crypto'
import { generateToken } from '../services/auth.service.js';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    Image: {
        type: String,
        default: '/images/default-image.png',
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    }
}, { timestamps: true });

// Generating Salt and hashpassword
UserSchema.pre('save', function (next) {
    const User = this;

    const salt = randomBytes(16).toString();
    const hashPassword = createHmac("sha256", salt).update(User.password).digest('hex');

    this.salt = salt;
    this.password = hashPassword;

    next();
})

// signIn function to match the user password and hashpassword
UserSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');
    const salt = user.salt;
    const userProvidedHash = user.password;
    const UserhashPassword = createHmac('sha256', salt).update(password).digest('hex');
    if (UserhashPassword !== userProvidedHash) throw new Error('Password not match');

    const token = generateToken(user);
    return token;
})

const User = model('User', UserSchema);

export default User;