import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId: userId}, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.cookie('jwt', token, { 
        httpOnly: true, 
        maxAge: 30 * 24 * 60 *60 * 1000, 
        sameSight: 'strict', 
        secure: process.env.NODE_ENV !== 'development'
    });
}

export default generateToken;