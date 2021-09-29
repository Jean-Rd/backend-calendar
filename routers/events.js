const { Router } = require('express');
const { postEvents, getEvents, updateEvents, deleteEvents } = require('../controllers/events')
const { validateToken } = require('../middlewares/validateToken');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validatorFields } = require('../middlewares/validatorFields');

// Event Router CRUD
// host + /api/events

const router = Router();

router.use( validateToken );

router.post( 
    '/',
    [
        check('title', "Title is required").not().isEmpty(),
        check('start', 'Start date is invalid').custom( isDate ),
        check( 'end', 'End date is invalid' ).custom( isDate ),
        validatorFields
    ],
    postEvents
    );

router.get( '/', getEvents );

router.put( 
    '/:id',
    [
        check('title', "Title is required").not().isEmpty(),
        check('start', 'Start date is invalid').custom( isDate ),
        check( 'end', 'End date is invalid' ).custom( isDate ),
        validatorFields
    ] 
    ,updateEvents
     );

router.delete( '/:id', deleteEvents );

module.exports = router;



