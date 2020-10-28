import {AuthorizationData, isExistData} from "../redux/thunks/thunks";

export class testAPI {

    static baseUrl = '/json/'

// ------AUTHORIZATION-----//
    static postAuthorizationData = (data: AuthorizationData): Promise<Response> => {
        console.log(data, "postAuthorizationData")
        return fetch(`${testAPI.baseUrl}authorization.json`)
    }

    static postRegistrationData = (data: AuthorizationData): Promise<Response> => {
        console.log(data, "postRegistrationData")
        return fetch(`${testAPI.baseUrl}authorization.json`)
    }

    static getIsExistUser = (data: isExistData): Promise<Response> => {
        console.log(data, "getIsExistUser")
        return fetch(`${testAPI.baseUrl}isExistUser.json`)
    }
}