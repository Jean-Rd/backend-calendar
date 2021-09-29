const { Router } = require('express');
const { authLogin, authRegister, authRenew } = require('../controllers/auth');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validatorFields');
const { validateToken } = require('../middlewares/validateToken');

// Auth router
// host + /api/auth

const router = Router();

router.post( 
    "/", 
    [
        check("email", "Email is'nt valid").isEmail(),
        check("password", "Password is'nt valid").isLength({ min: 6 }),
        validatorFields
    ],
    authLogin 
    );

router.post( 
    "/register",
    [
        check( 'name', 'Name is required' ).not().isEmpty(),
        check( 'email', "Email is'nt valid" ).isEmail(),
        check( 'password', 'password is invalid' ).isLength({ min: 6}),
        validatorFields
    ],
    authRegister,
  )

router.get( "/renew", validateToken,authRenew )

module.exports = router;