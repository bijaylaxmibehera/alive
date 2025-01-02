const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/user.model')
const Admin = require('../models/admin.model')
const { generateHashedPassword } = require('../utils/utils')

//social logins
const client = new OAuth2Client()

const googleCallback = async (token, role, organization) => {
  try {
    const googleResponse = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = googleResponse.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user;

    if (role === 'admin') {
      user = await Admin.findOne({ googleId });
      if (!user) {
        // Create new admin if not found
        user = new Admin({
          name,
          email,
          organization,
          googleId,
          profilePicture: picture,
        });
        user = await user.save();
      }
    } else {
      user = await User.findOne({ googleId });
      if (!user) {
        // Create new user if not found
        user = new User({
          name,
          email,
          googleId,
          profilePicture: picture,
        });
        user = await user.save();
      }
    }
    return user;
  } catch (error) {
    console.error('Google callback error:', error.message);
    throw new Error('Google authentication failed.');
  }
};


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

module.exports = { googleCallback, userRegister, adminRegister, login }
