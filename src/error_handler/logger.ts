import {ErrorResponse} from './../index'

export const logResponse = (errorObject: ErrorResponse) => {

    // logging logic comes here
    console.log('Logging via logger mechanism - *******');
    console.log(errorObject);
}

