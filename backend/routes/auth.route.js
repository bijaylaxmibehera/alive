const express = require('express')
const authRouter = express.Router()
const {
  googleCallback,
  userRegister,
  adminRegister,
  login
} = require('../controller/auth.controller')
const upload = require('../middleware/upload.middleware')
const { generateWebToken } = require('../utils/utils')

authRouter.post('/google-login', async (req, res) => {
  try {
    const { token, role } = req.body
    const organization = req.body.organization || undefined

    if (!token || !role) {
      return res.status(400).json({ message: 'Token and role are required.' })
    }

    if (role === 'admin' && !organization) {
      return res
        .status(400)
        .json({ message: 'Organization name is required for admin.' })
    }

    const user = await googleCallback(token, role, organization)
    const webToken=generateWebToken(user.id);
    res.status(200).json({
      message: `Google login successful as a ${role}`,
      user,
      role,
      token:webToken
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Google login failed.', error: error.message })
  }
})

// User registration route
authRouter.post(
  '/register/user',
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const profilePicture = req.file ? `/uploads/${req.file.filename}` : null
      const userData = { ...req.body, profilePicture }
      const newUser = await userRegister(userData)
      const token = generateWebToken(newUser._id)
      res
        .status(201)
        .json({ message: 'User registered successfully', user: newUser, token })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

// Admin registration route
authRouter.post(
  '/register/admin',
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const profilePicture = req.file ? `/uploads/${req.file.filename}` : null
      const adminData = { ...req.body, profilePicture }
      const newAdmin = await adminRegister(adminData)
      const token = generateWebToken(newAdmin._id)
      res.status(201).json({
        message: 'Admin registered successfully',
        admin: newAdmin,
        token
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)
//login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const { account, role } = await login(email, password)
    const token = generateWebToken(account._id)
    res.status(200).json({
      success: true,
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } logged in successfully`,
      account,
      role,
      token
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

module.exports = authRouter
