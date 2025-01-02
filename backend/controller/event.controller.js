const mongoose = require('mongoose')
const Admin = require('../models/admin.model')
const Event = require('../models/event.model')

const createEvent = async (eventData, adminId) => {
  try {
    const {
      title,
      coverImage,
      description,
      eventDate,
      location,
      organizer,
      startTime,
      endTime,
      category,
      mode,
      isFree,
      ticketTypes,
      attendeeDetails
    } = eventData

    const newEvent = new Event({
      title,
      coverImage,
      description,
      eventDate,
      location,
      organizer: adminId,
      startTime,
      endTime,
      category,
      mode,
      isFree,
      ticketTypes,
      attendeeDetails
    })

    return await newEvent.save()
  } catch (error) {
    throw error
  }
}

const getAllEvents = async () => {
  try {
    const events = await Event.find()
    if (!events || events.length === 0) {
      return new Error('No  events  found')
    }
    return events
  } catch (error) {
    throw error
  }
}

const updateEvent = async (eventId, adminId, updatedData) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, organizer: adminId },
      updatedData,
      { new: true }
    )

    if (!updatedEvent) {
      return new Error('Event not found')
    }
    return updatedEvent
  } catch (error) {
    throw error
  }
}

const deleteEvent = async (eventId, adminId) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: eventId,
      organizer: adminId
    })

    if (!deletedEvent) {
      return new Error('Event not found!')
    }

    return deletedEvent
  } catch (error) {
    throw error
  }
}

const getEventById = async eventId => {
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      return new Error('Event not found!')
    }
    return event
  } catch (error) {
    throw error
  }
}

const getEventsCreatedByAdmin = async adminId => {
  try {
    const admin = await Admin.findById(adminId).populate('eventsCreated')

    if (!admin) {
      return new Error('Admin not found!')
    }

    return admin.eventsCreated
  } catch (error) {
    throw error
  }
}
const getOrganizerDetails= async(adminId) =>{
  try {
    const organizer = await Admin.findById(adminId)
    return organizer ? { name: organizer.name, email: organizer.email } : null
  } catch (error) {
    console.error('Error fetching organizer details:', error.message)
    throw error
  }
}
module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsCreatedByAdmin,
  getOrganizerDetails
}
