const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const initializePassport = require('../config/passport')
const {
  userRegister,
  userLogin,
  adminRegister,
  adminLogin
} = require('../controller/auth.controller')
const  upload  = require('../middleware/upload.middleware')

// Google OAuth routes
authRouter.get('/google', (req, res, next) => {
  const { clientID, clientSecret } = req.query

  if (!clientID || !clientSecret) {
    return res
      .status(400)
      .json({ message: 'Google Client ID and Secret are required' })
  }

  initializePassport(clientID, clientSecret)

  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  )
})

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user
    res.json({ message: 'Authenticated successfully', user })
  }
)

// User registration route
authRouter.post(
  '/register/user',
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const profilePicture = req.file ? `/uploads/${req.file.filename}` : null
      const userData = { ...req.body, profilePicture }
      const newUser = await userRegister(userData)
      res
        .status(201)
        .json({ message: 'User registered successfully', user: newUser })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

// User login route
authRouter.post('/login/user', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userLogin(email, password)
    res.json({ message: 'User logged in successfully', user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Admin registration route
authRouter.post(
  '/register/admin',
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const profilePicture = req.file ? `/uploads/${req.file.filename}` : null
      const adminData = { ...req.body, profilePicture }
      const newAdmin = await adminRegister(adminData)
      res
        .status(201)
        .json({ message: 'Admin registered successfully', admin: newAdmin })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

// Admin login route
authRouter.post('/login/admin', async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await adminLogin(email, password)
    res.json({ message: 'Admin logged in successfully', admin })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})


module.exports = authRouter;