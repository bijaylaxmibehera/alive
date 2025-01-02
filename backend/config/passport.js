const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

const client = new OAuth2Client();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name, picture, sub: googleId } = profile._json;

        let user;
        if (profile.role === 'admin') {
          user = await Admin.findOne({ googleId });
          if (!user) {
            user = new Admin({
              name,
              email,
              googleId,
              profilePicture: picture,
            });
            await user.save();
          }
        } else {
          user = await User.findOne({ googleId });
          if (!user) {
            user = new User({
              name,
              email,
              googleId,
              profilePicture: picture,
            });
            await user.save();
          }
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user._id, type: user instanceof Admin ? 'Admin' : 'User' });
});

passport.deserializeUser(async (obj, done) => {
  const model = obj.type === 'User' ? User : Admin;
  const user = await model.findById(obj.id);
  done(null, user);
});

module.exports = passport;
