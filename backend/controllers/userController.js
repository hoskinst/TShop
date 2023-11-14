import asyncHandler from "../middleware/async-handler.js"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route GET /api/users/login
// @access public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email});
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
    } else {
        res.status(401)
        throw new Error('Invalid email or password');
    }
})

// @desc Register user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async(req, res) => {
    const { email, name, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Email is already in use.')
    }
    
    const user = await User.create({name, email, password});

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,   
        })
    }
})

// @desc logout user
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: 'Logged out successfully!'})
})

// @desc get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,   
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;       
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

// @desc update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async(req, res) => {
    res.send('updateUserProfile');
})

// @desc get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    res.send('getUsers');
})

// @desc get users profile by Id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    res.send('getUserbyId');
})

// @desc delete user profile
// @route DELETE /api/users/profile
// @access Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    res.send('deleteUser');
})

export {
    authUser,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    logoutUser,
    registerUser,
    updateUser,
    updateUserProfile
}