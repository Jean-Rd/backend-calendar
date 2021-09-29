const moment = require('moment');

const isDate = ( datetime ) => {

    if( !datetime ){
        return false;
    }

    const datetimeMoment = moment(datetime);

    if( datetimeMoment.isValid() ){
        return true;
    } else {
        return false;
    }

}

module.exports = { isDate }