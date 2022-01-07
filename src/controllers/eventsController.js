const boom = require('@hapi/boom');

const { createNewEvent, findAllEvents, updateEventById, findById, deleteEventById } = require('../services/eventsService');

const getEvents = async (req, res, next) => {
  try {
    const events = await findAllEvents();

    res.json({
      ok: true,
      msg: 'Events',
      events
    })
  } catch (error) {
    next(error);
  }
}

const createEvent = async (req, res, next) => {
  const { id } = req.tokenPayload;

  try {
    const eventDto = {
      ...req.body,
      user: id,
    };
    const event = await createNewEvent(eventDto);

    res.json({
      ok: true,
      msg: 'Event was created successfully',
      event,
    });
  } catch ( error ) {
    next(error);
  }
}

const updateEvent = async (req, res, next) => {
  const { id: idEvent } = req.params;
  const { id: idUser } = req.tokenPayload;

  try {
    const event = await findById(idEvent);
    if(!event) throw boom.notFound('There are not any event with this id')

    if(event.user._id.toString() !== idUser) throw boom.unauthorized('Only can update the event the same person that created it');

    const eventUpdated = await updateEventById(idEvent, req.body);
    res.json({
      ok: true,
      msg: 'Event was updated successfully',
      event: eventUpdated
    })
  } catch ( error ) {
    next(error);
  }
}

const deleteEvent = async (req, res, next) => {
  const { id: idEvent } = req.params;
  const { id: idUser } = req.tokenPayload;

  try {
    const event = await findById(idEvent);
    if(!event) throw boom.notFound('There are not any event with this id')

    if(event.user._id.toString() !== idUser) throw boom.unauthorized('Only can update the event the same person that created it');

    await deleteEventById(idEvent);
    res.json({
      ok: true,
      msg: 'Event was deleted successfully'
    })
  } catch ( error ) {
    next(error);
  }
}



module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}
