import crypto from 'crypto'
import mappings from './error_handler/error-code-mappings.json';
import { logResponse } from './error_handler/logger'

export interface ErrorDetail {
    field: string,
    value: any,
    issue: string,
    location: string
}

export interface Error {
    name: string,
    details?: ErrorDetail[],
    debugId?: string,
    message: string,
    informationLink?: string
}

export interface ErrorResponse {
    statusCode: number,
    nspCode: string,
    body: Error
}

export interface Info {
    name: string,
    message: string
}

export interface InfoResponse {
    statusCode: number,
    nspCode: string,
    body: Info
}

export const errorBody = (err: Error) => {
    // Don't want accidental side effects.
    const errCopy = { ...err }
    if (!errCopy.debugId) {
        errCopy.debugId = crypto.randomBytes(16).toString('hex')
    }
    return errCopy
}

export const errorResponse = (statusCode: number, err: Error): ErrorResponse => {

    const nspStatusCode = nspStatusCodeFinder(statusCode, 500);

    const errorHandler = {
        statusCode,
        nspCode: nspStatusCode,
        body: errorBody(err)
    }
    logResponse(errorHandler);
    return errorHandler
}

export const errorResponseCustomMessage = (statusCode: number, errName: string, errMessage: string): ErrorResponse => {
    const nspStatusCode = nspStatusCodeFinder(statusCode, 500);

    const errorHandler = {
        statusCode,
        nspCode: nspStatusCode,
        body: {
            name: errName,
            message: errMessage
        }
    }
    logResponse(errorHandler);
    return errorHandler

}

export const infoResponse = (statusCode: number, infoName: string, infoMessage: string): InfoResponse => {

    const nspStatusCode = nspStatusCodeFinder(statusCode, 200);

    const infoHandler = {
        statusCode,
        nspCode: nspStatusCode,
        body: {
            name: infoName,
            message: infoMessage
        }
    }
    logResponse(infoHandler);
    return infoHandler
}

function nspStatusCodeFinder(statusCode: number, defaultStatusCode: number) {
    return (<any>mappings)[statusCode] || defaultStatusCode;
}
