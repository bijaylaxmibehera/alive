const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    googleId: { type: String },
    profilePicture: { type: String },
    eventsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
