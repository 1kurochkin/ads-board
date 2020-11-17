// ------AUTHORIZATION-TYPES-----//
import {SettingsFieldType} from "../redux/reducers/settingsState/settingsState";

export type AuthorizationData = { login: string,  password: string }
export type RegistrationData = { name: string,  login: string, phone: string, password: string }

// ------CREATE-ANNOUNCEMENT-PAGE---//?

export type NewAnnouncementData = {
    categoryId: number,
    name: string,
    description: string
    photoList?: Array<string>,
    price: number,
    stationId: string,
    sellerPhone: string
}

// ------SEARCH-BOX-TYPES-----//
export type GetAnnouncementsCategoryType = "announcements" |  "housing" | "apartment" | "bunk" | "room" | "job" | "vacancies" | string

// ------SETTINGS-TYPES---//
export type PostSettingsAvatarData = { data: string, type: string }
export type PostSettingsNameData = { name: string }
export type PostSettingsEmailData = { email: string }
export type PostSettingsPhoneData = { phone: string }

export class serverAPI {

    // static baseURL = 'http://localhost:8080'
    static baseURL = "http://127.0.0.1:8081/127.0.0.1:8080"
    static login = () => localStorage.getItem("login") || "defaultUser"
    static password = () => localStorage.getItem("password") || "111111"
    static base64token = () => btoa(`${serverAPI.login()}:${serverAPI.password()}`)

    // ----HEADERS---//
    static headers = () => new Headers({
        "Content-Type" : "application/json",
    })

    static addAuthHeader = (headers: any) => {
        headers.set("Authorization", `Basic ${serverAPI.base64token()}`)
        return headers
    }
    static headerWithAuth = () => serverAPI.addAuthHeader(serverAPI.headers())

    // ----REQUEST-CONFIGURATION---//
    static getConfiguration = (data?: any, withAuth = true) => {
        console.log(data)
        const headers = withAuth ?
            serverAPI.headerWithAuth() :
            serverAPI.headers()
        const body = data ? JSON.stringify(data) : null
        return {
            method: 'GET',
            body: body,
            headers
        }
    }

    static postConfiguration = (data?: any, withAuth = true) => {
        console.log(data)
        const headers = withAuth ?
            serverAPI.headerWithAuth() :
            serverAPI.headers()
        const body = data ? JSON.stringify(data) : null
        return {
            method: 'POST',
            body: body,
            headers
        }
    }

    // static putConfiguration = () => {
    //     return {
    //         method: 'PUT',
    //         headers: serverAPI.headerWithAuth()
    //     }
    // }

// -----------------CONFIGURATED-REQUEST--------------------//
    static configuredGET = (path: string, withAuth= false, data?:any) => {
        const settings = serverAPI.getConfiguration(data, withAuth)
        return fetch(serverAPI.baseURL + path, settings)
    }

    static configuredPOST = (path: string, data?: any, withAuth= true) => {
        const settings = serverAPI.postConfiguration(data, withAuth)
        return fetch(serverAPI.baseURL + path, settings)
    }

    static logoutPOST = () => {
        const settings = {method: 'POST'}
        const baseUrlWithoutApi = serverAPI.baseURL.slice(0, -4)
        const path = "/logout"
        return fetch( baseUrlWithoutApi + path, settings)
    }

    // static configuredPUT = (path) => {
    //     const settings = serverAPI.putConfiguration()
    //     return fetch(serverAPI.baseURL + path, settings)
    // }

    // ------AUTHORIZATION-----//
    static postAuthorizationData = (data: AuthorizationData): Promise<Response> => {
        console.log(data, "postAuthorizationData")
        const path = "/login"
         return serverAPI.configuredPOST(path, data,false)
    }

    static postRegistrationData = (data: RegistrationData): Promise<Response> => {
        console.log(data, "postRegistrationData")
        const path = "/registration"
        return serverAPI.configuredPOST(path, data, false)
    }

    // ------GET-USER-INFO-----//
    static getUserInfo = (): Promise<Response> => {
        console.log("getUserInfo")
        const path = "/user/settings"
        return serverAPI.configuredGET(path, true)
    }

    // ------SEARCH-BOX-----//
    static getSubwayStations = (): Promise<Response> => {
        console.log("getSubwayStations")
        const path = "/subwayStations"
        return serverAPI.configuredGET(path, false)
    }

    static getAnnouncementsByFilters = (page: number, name?: string, categoryId?: string| number, stationId?: string | number): Promise<Response> => {
        const path = `/announcement/filter?categoryId=${categoryId}&name=${name}&stationId=${stationId}&page=${page}`
        console.log(page, categoryId, name, stationId, "getAnnouncementsByFilters", path)
        return serverAPI.configuredGET(path, false)
    }

    static getAnnouncementsList = (page: number): Promise<Response> => {
        const path = `/announcement/all?page=${page}`
        console.log("getAnnouncementsList")
        return serverAPI.configuredGET(path, false)
    }

    // ------GET-ANNOUNCEMENT-BY-CATEGORY-AND-ID----//
    static getAnnouncementById = (id: number): Promise<Response> => {
        console.log("getAnnouncementById", id)
        const path = `/announcement/${id}`
        return serverAPI.configuredGET(path, false)
    }

    // ------MY-ANNOUNCEMENTS-PAGE---//
    static getMyAnnouncements = (page: number): Promise<Response> => {
        console.log("getMyAnnouncements", page)
        const path = `/userAnnouncements?page=${page}`
        return serverAPI.configuredGET(path, false)
    }

    static postDeleteAnnouncement = (id:number): Promise<Response> => {
        console.log(id, "postDeleteAnnouncement")
        const path = `/announcement/delete/${id}`
        return serverAPI.configuredPOST(path, null, true)
    }


    // ------SETTINGS-PAGE---//

    static postSettingsByField = (data: any, field: SettingsFieldType): Promise<Response> => {
        console.log(data, "postSettingsByField")
        switch (field) {
            case "avatar": return serverAPI.postSettingsAvatar(data)
            case "name": return serverAPI.postSettingsName(data)
            case "phone": return serverAPI.postSettingsPhone(data)
            default: return serverAPI.postSettingsAvatar(data)
        }
    }
    static postSettingsAvatar = (data: PostSettingsAvatarData): Promise<Response> => {
        console.log(data, "postSettingsAvatar")
        const path = "/user/settings/avatar"
        return serverAPI.configuredPOST(path, data, true)
    }

    static postSettingsName = (data: PostSettingsNameData): Promise<Response> => {
        console.log(data, "postSettingsName")
        const path = "/user/settings/name"
        return serverAPI.configuredPOST(path, data, true)
    }

    static postSettingsPhone = (data: PostSettingsPhoneData): Promise<Response> => {
        const path = "/user/settings/phone"
        return serverAPI.configuredPOST(path, data, true)
    }

    static postLogout = (): Promise<Response> => {
        console.log("postLogout")
        return serverAPI.logoutPOST()
    }

    static postDelete = (): Promise<Response> => {
        console.log("postDelete")
        const path = "/user/delete"
        return serverAPI.configuredPOST(path, null, true)
    }

    // ------CREATE-ANNOUNCEMENT-PAGE---//
    static postNewAnnouncement = (data: NewAnnouncementData): Promise<Response> => {
        console.log(data, "postNewAnnouncement")
        const path = "/announcement/new"
        return serverAPI.configuredPOST(path, data, true)
    }
}