import { validateToken } from '../services/auth.service.js';

const vaidateUserByCokkie = (cookieName) => {
    return (req, res, next) => {
        const tokenValue = req.cookies[cookieName];
        if (!tokenValue) {
            return next();
        }
        try {
            const userPayload = validateToken(tokenValue);
            req.users = userPayload;
        } catch (error) { }

        return next();
    }
}

export default vaidateUserByCokkie;