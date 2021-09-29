const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    const token = req.header("x-token-access");

    if( !token ) {
        return res.status( 401 ).json({
            ok: false,
            msg: "Token no existe"
        })
    }

    try {
        
        const { uid, name } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log( error );
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        });
    }



    next();

}

module.exports = {validateToken};