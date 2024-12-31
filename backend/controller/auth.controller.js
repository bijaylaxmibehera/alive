const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Admin = require('../models/admin.model')
const { generateHashedPassword } = require('../utils/utils')

//User authentication
const userRegister = async userData => {
  try {
    const { name, email, password, profilePicture, bookedEvent } = userData
    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
      throw new Error('User already exist')
    }

    const hashedPassword = await generateHashedPassword(password)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture,
      bookedEvent
    })

    return await newUser.save()
  } catch (error) {
    throw error
  }
}

const userLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new Error('Invalid credentials')
    }
    return user
  } catch (error) {
    throw error
  }
}
//Admin authentication
const adminRegister = async adminData => {
  try {
    const {
      organization,
      name,
      email,
      password,
      profilePicture,
      eventsCreated
    } = adminData

    const isAdminExist = await Admin.findOne({ email })

    if (isAdminExist) {
      throw new Error('Admin already exist')
    }

    const hashedPassword = await generateHashedPassword(password)
    const newAdmin = new Admin({
      organization,
      name,
      email,
      password: hashedPassword,
      profilePicture,
      eventsCreated
    })

    return await newAdmin.save()
  } catch (error) {
    throw error
  }
}

const adminLogin = async (email, password) => {
  try {
    const admin = await Admin.findOne({ email })
    if (!admin) {
      throw new Error('Admin not found')
    }

    const isPasswordMatched = await bcrypt.compare(password, admin.password)

    if (!isPasswordMatched) {
      throw new Error('Invalid credentials')
    }
    return admin
  } catch (error) {
    throw error
  }
}

module.exports = { userRegister, userLogin, adminRegister, adminLogin }
