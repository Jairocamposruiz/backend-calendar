const Event = require('../models/Event');

const createNewEvent = async (eventDto) => {
  const event = new Event(eventDto);
  return await event.save();
}

const findAllEvents = async () => {
  return await Event.find().populate('user', ['name']);
}

const updateEventById = async (id, newPayload) => {
  return await Event.findByIdAndUpdate(id, newPayload, { new: true })
}

const findById = async (id) => {
  return await Event.findById(id);
}

const deleteEventById = async (id) => {
  return await Event.deleteOne({id});
}

module.exports = {
  createNewEvent,
  findAllEvents,
  updateEventById,
  findById,
  deleteEventById
}