const { response } = require('express');
const Usuario = require('../models/usersRegister');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');

const authLogin = async( req, res=response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await Usuario.findOne({ email });
        
        if( !user ){
            return res.status( 400 ).json({
                ok: false,
                msg: 'Invalid credencialds'
            })
        }

        const validPass = bcrypt.compareSync( password, user.password );

        if( !validPass ){
            return res.status( 400 ).json({
                ok: false,
                msg: 'Invalid password'
            })
        }

        const token = await generateToken(  user._id, user.name );

        res.status(200).json({
            ok: true,
            uid: user._id, 
            token
        })

    } catch (error) {

        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: "Error in server"
        })
    }

} 

const authRegister = async( req, res=response ) => {

    const { email, password } = req.body;
    
    try {
        
        let users = await Usuario.findOne({ email })

        if( users ){

            return res.status( 400 ).json({
                ok: false,
                msg: 'El usuario ya existe'
            })

        }
        
        users = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync( password, salt );

        await users.save();

        const token = await generateToken(  users._id, users.name );

        res.status(201).json({
            ok: true,
            uid: users._id,
            token
        })

    } catch (error) {
        console.log(error)
        res.status( 500 ).json({
            ok: false,
            msg: "Error in server"
        })
    }

} 

const authRenew = async( req, res=response ) => {

    const { uid, name } = req;

    const token =  await generateToken( uid, name );

    res.json({
        ok: true,
        msg: "Renew JWT",
        token
    })
}

module.exports = {
    authLogin,
    authRegister,
    authRenew
}

