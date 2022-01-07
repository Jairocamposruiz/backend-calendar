const { Router } = require('express');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const {
  validationFields, checkMongoId, checkTitle, checkNotes, checkStart, checkEnd,
} = require('../middlewares/validationFields');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

//Pongo el validateJwt aqui porque lo necesito en todas las rutas
router.use(validateJwt);

router.get(
  '/',
  [
    validationFields,
  ],
  getEvents,
);

router.post(
  '/',
  [
    checkTitle,
    checkNotes,
    checkStart,
    checkEnd,
    validationFields,
  ],
  createEvent,
);

router.put(
  '/:id',
  [
    checkMongoId,
    checkTitle,
    checkNotes,
    checkStart,
    checkEnd,
    validationFields,
  ],
  updateEvent,
);

router.delete(
  '/:id',
  [
    checkMongoId,
    validationFields,
  ],
  deleteEvent,
);


module.exports = router;