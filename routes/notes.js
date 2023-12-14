const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require('./tips');

router.use('/tips', notesRouter);


module.exports = router;