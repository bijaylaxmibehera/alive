const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Admin = require('../models/admin.model')
const { generateHashedPassword } = require('../utils/utils')

//User  register
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

//Admin register
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

//login
const login = async (email, password) => {
  try {
    const account =
      (await User.findOne({ email })) || (await Admin.findOne({ email }))

    if (!account) {
      throw new Error('Account not found')
    }

    const isPasswordMatched = await bcrypt.compare(password, account.password)
    if (!isPasswordMatched) {
      throw new Error('Invalid credentials')
    }

    const role = account instanceof User ? 'user' : 'admin'

    return { account, role }
  } catch (error) {
    throw error
  }
}

module.exports = { userRegister, adminRegister, login }
