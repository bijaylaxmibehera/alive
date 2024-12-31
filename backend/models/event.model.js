const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'party',
      'holidays',
      'meeting',
      'business',
      'hobbies',
      'dating',
      'music',
      'classical',
      'concert',
      'mental health',
      'wedding',
      'birthday'
    ]
  },
  mode: {
    type: String,
    required: true,
    enum: ['online', 'offline']
  },
  isFree: {
    type: Boolean,
    default: false
  },
  ticketTypes: [
    {
      type: { type: String, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
      sold: { type: Number, default: 0 }
    }
  ],
  attendeeDetails: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      ticketType: { type: String },
      quantity: { type: Number }
    }
  ]
})

const Event = mongoose.model('Event', EventSchema)
module.exports = Event
