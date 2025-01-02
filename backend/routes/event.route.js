const express = require('express')
const eventRouter = express.Router()
const upload = require('../middleware/upload.middleware')
const { authenticateAdmin } = require('../middleware/auth.middleware')
const Admin = require('../models/admin.model')
const {
  getAllEvents,
  getEventById,
  getEventsCreatedByAdmin,
  createEvent,
  updateEvent,
  deleteEvent,
  getOrganizerDetails
} = require('../controller/event.controller')

// Route to fetch all events
eventRouter.get('/', async (req, res) => {
  try {
    const events = await getAllEvents()
    const eventsWithOrganizer = []
    for (const event of events) {
      const organizer = await getOrganizerDetails(event.organizer)
      eventsWithOrganizer.push({ ...event.toObject(), organizer })
    }
    return res
      .status(200)
      .json({
        message: 'Fetch all events successfully',
        events: eventsWithOrganizer
      })
  } catch (error) {
    console.error('Error fetching events:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// Route to create a new event
eventRouter.post(
  '/',
  authenticateAdmin,
  upload.single('coverImage'),
  async (req, res) => {
    try {
      const eventData = req.body
      const adminId = req.admin.id
      if (req.file) {
        eventData.coverImage = `/uploads/${req.file.filename}`
      }

      if (req.body.coverImage) {
        eventData.coverImage = req.body.coverImage
      }
      if (eventData.ticketTypes) {
        try {
          eventData.ticketTypes = JSON.parse(eventData.ticketTypes).map(
            ticket => (typeof ticket === 'string' ? JSON.parse(ticket) : ticket)
          )
        } catch (err) {
          return res.status(400).json({ message: 'Invalid ticketTypes format' })
        }
      }
      const savedEvent = await createEvent(eventData, adminId)

      await Admin.findByIdAndUpdate(adminId, {
        $push: { eventsCreated: savedEvent._id }
      })

      return res
        .status(201)
        .json({ message: 'Event created successfully', event: savedEvent })
    } catch (error) {
      console.error('Error creating event:', error.message)
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message })
    }
  }
)

// fetch events created by admin
eventRouter.get('/my-events', authenticateAdmin, async (req, res) => {
  try {
    const adminId = req.admin.id
    const eventsCreated = await getEventsCreatedByAdmin(adminId)

    return res.status(200).json({
      message: 'Fetched admin-created events successfully',
      events: eventsCreated
    })
  } catch (error) {
    console.error('Error fetching admin-created events:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// Route to fetch a single event by ID
eventRouter.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId
    const event = await getEventById(eventId)
    const organizer = await getOrganizerDetails(event.organizer)

    return res.status(200).json({
      event: { ...event.toObject(), organizer }
    })
  } catch (error) {
    console.error('Error fetching event:', error.message)
    return res
      .status(404)
      .json({ message: 'Event not found', error: error.message })
  }
})

// Route to update an event
eventRouter.put('/:eventId', authenticateAdmin, async (req, res) => {
  try {
    const adminId = req.admin.id
    const eventId = req.params.eventId
    const updatedData = req.body
    if (updatedData.ticketTypes) {
      try {
        updatedData.ticketTypes = JSON.parse(updatedData.ticketTypes).map(
          ticket => (typeof ticket === 'string' ? JSON.parse(ticket) : ticket)
        )
      } catch (err) {
        return res.status(400).json({ message: 'Invalid ticketTypes format' })
      }
    }

    const updatedEvent = await updateEvent(eventId, adminId, updatedData)
    return res
      .status(200)
      .json({ message: 'Event updated successfully', event: updatedEvent })
  } catch (error) {
    console.error('Error updating event:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// Route to delete an event
eventRouter.delete('/:eventId', authenticateAdmin, async (req, res) => {
  try {
    const adminId = req.admin.id
    const eventId = req.params.eventId
    const deletedEvent = await deleteEvent(eventId, adminId)

    await Admin.findByIdAndUpdate(adminId, {
      $pull: { eventsCreated: eventId }
    })
    return res
      .status(200)
      .json({ message: 'Event deleted successfully', event: deletedEvent })
  } catch (error) {
    console.error('Error deleting event:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

module.exports = eventRouter
