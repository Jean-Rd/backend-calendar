const Events = require('../models/Events');

const postEvents = async(req, res) => {

    const event = new Events( req.body );

    try {

        event.user = req.uid;
        const eventDB = await event.save();
        res.status( 201 ).json({
            ok: true,
            event: eventDB
        });
        
    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });

    }

}

const getEvents = async(req, res) => {

    const eventsDB = await Events.find();

    res.status(200).json({
        ok: true,
        events: eventsDB
    })
}

const updateEvents = async( req, res ) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const currentEvent = await Events.findById( eventId );

        if(  !currentEvent ) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado"
            })
        }

        if(  currentEvent.user.toString() !== uid ) {

            return res.status( 401 ).json({
                ok: false,
                msh: 'You are not autorize'
            })

        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        const eventPut = await Events.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.status( 200 ).json({
            ok: true,
            event: eventPut
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const deleteEvents = async( req, res ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Events.findById( eventId );
        
        if( !event ){
            return res.status( 404 ).json({
                ok: false,
                msg: "Evento no encontrado"
            });
        }
        
        if( event.user.toString() !== uid ){
            return res.status( 401 ).json({
                ok: false,
                msg: "No autorizado"
            });
        }

        await Events.findByIdAndDelete( eventId );

        res.status( 200 ).json({
            ok: true,
            msg: "Evento eliminado"
        })

    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

    res.status(200).json({
        ok: true,
        msg: "deleteEvents",
        eventId,
        uid
    })
}

module.exports = {
    postEvents,
    getEvents,
    updateEvents,
    deleteEvents
}

