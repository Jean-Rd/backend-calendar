const { Schema, model } = require('mongoose');

const EventsSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "usersRegister"
    }

})

EventsSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};

module.exports = model('event', EventsSchema);