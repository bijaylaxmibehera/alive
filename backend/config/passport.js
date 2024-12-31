const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').Strategy
const User = require('../models/user.model')
const Admin = require('../models/admin.model')

module.exports = (clientID, clientSecret) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { email, name, picture, sub } = profile._json

          let user =
            (await User.findOne({ googleId: sub })) ||
            (await Admin.findOne({ googleId: sub }))
          if (!user) {
            user =
              (await User.findOne({ email })) ||
              (await Admin.findOne({ email }))
          }

          if (!user) {
            user = new User({
              name,
              email,
              googleId: sub,
              profilePicture: picture
            })
            await user.save()
          } else {
            user.googleId = sub
            user.profilePicture = picture
            await user.save()
          }

          return done(null, user)
        } catch (error) {
          return done(error, null)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, { id: user._id, type: user instanceof User ? 'User' : 'Admin' })
  })

  passport.deserializeUser(async (obj, done) => {
    try {
      const { id, type } = obj
      const model = type === 'User' ? User : Admin
      const user = await model.findById(id)
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}
