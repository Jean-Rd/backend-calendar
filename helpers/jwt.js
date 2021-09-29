const jwt = require('jsonwebtoken');

const generateToken = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {
        const payload = {
            uid: uid,
            name: name
        };
    
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '2h',
        }, ( err, token ) => {
    
            if( err ){
                console.log( err );
                reject( "No se pudo generar el token" );
            }
    
            resolve( token );

        } );
    } )
}

module.exports = {
    generateToken
}