const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  profilePicture: { type: String },
  bookedEvents: [
    {
      event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
      ticketType: { type: String },
      quantity: { type: Number },
      amountPaid: { type: Number }
    }
  ]
})

const User = mongoose.model('User', UserSchema)
module.exports = User
