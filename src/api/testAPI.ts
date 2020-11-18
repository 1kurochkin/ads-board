// ------AUTHORIZATION-TYPES-----//
import {SettingsFieldType} from "../redux/reducers/settingsState/settingsState";

export type AuthorizationData = { login: string,  password: string }
export type RegistrationData = { name: string,  login: string, password: string }

// ------CREATE-ANNOUNCEMENT-PAGE---//?
export type NewAnnouncementData = {
    category: number,
    name: string,
    description: string
    photos?: Array<string>,
    price: number,
    subway: string,
    phone: string
}

// ------SEARCH-BOX-TYPES-----//
export type GetAnnouncementsCategoryType = "announcements" |  "housing" | "apartment" | "bunk" | "room" | "job" | "vacancies" | string

// ------SETTINGS-TYPES---//
export type PostSettingsAvatarData = { avatar: string }
export type PostSettingsNameData = { name: string }
export type PostSettingsEmailData = { email: string }
export type PostSettingsPhoneData = { phone: string }

export class testAPI {

    static baseUrl = './json/'

    // ------AUTHORIZATION-----//
    static getIsExistUser = (login: string): Promise<Response> => {
        console.log(login, "getIsExistUser")
        const path = `getIsExistUser`
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    static postAuthorizationData = (data: AuthorizationData): Promise<Response> => {
        console.log(data, "postAuthorizationData")
         return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    static postRegistrationData = (data: RegistrationData): Promise<Response> => {
        console.log(data, "postRegistrationData")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    // ------FEED-PAGE-----//
    //@response  20 последних объявлений
    static getLastAnnouncements = (page: number): Promise<Response> => {
        console.log("getLastAnnouncements")
        const path = `getLastAnnouncements`
        return fetch(`https://5faa8c4eb5c645001602abd5.mockapi.io/getAnnouncementsList`)
    }

    // ------GET-USER-INFO-----//
    static getUserInfo = (): Promise<Response> => {
        console.log("getUserInfo")
        return fetch(`https://5faa8c4eb5c645001602abd5.mockapi.io/getUserData`)
    }

    // ------SEARCH-BOX-----//
    static getSubwayStations = (): Promise<Response> => {
        console.log("getSubwayStations")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/getSubwayStations`)
    }

    static getAnnouncementsByFilters = (page: number, name?: string, category?: string| number, subway?: string | number): Promise<Response> => {
        const path = `getAnnouncementsByFilters?page=${page}&category=${category}&name=${name}&subway=${subway}`
        console.log(page, category, name, subway, "getAnnouncementsByFilters", path)
        return fetch(`https://5faa8c4eb5c645001602abd5.mockapi.io/getAnnouncementsByFilters`)
    }

    //---REQUEST-FOR-SEARCH-BOX/FEED-PAGE/HOUSING/JOB/TRADING---//
    static getAnnouncementsList = (page: number, category: GetAnnouncementsCategoryType): Promise<Response> => {
        const path = `getAnnouncementsByCategoryAndName?page=${page}&category=${category}`
        console.log(page, category, "getAnnouncementsByCategoryAndName", path)
        return fetch(`https://5faa8c4eb5c645001602abd5.mockapi.io/getAnnouncementsList`)
    }

    // ------GET-ANNOUNCEMENT-BY-CATEGORY-AND-ID----//
    static getAnnouncementByIdThunk = (category: GetAnnouncementsCategoryType, id: number): Promise<Response> => {
        console.log("getAnnouncementByIdThunk", category, id)
        const path = `getAnnouncementByIdThunk/${category}/${id}`
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/getAnnouncement`)
    }

    // ------MY-ANNOUNCEMENTS-PAGE---//
    static getMyAnnouncements = (page: number): Promise<Response> => {
        console.log("getMyAnnouncements")
        const path = `getMyAnnouncements?page=${page}`
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/getMyAnnouncements`)
    }

    static postDeleteAnnouncement = (id:number): Promise<Response> => {
        console.log(id, "postDeleteAnnouncement")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }


    // ------SETTINGS-PAGE---//

    static postSettingsByField = (data: any, field: SettingsFieldType): Promise<Response> => {
        console.log(data, "postSettingsByField")
        switch (field) {
            case "avatar": return testAPI.postSettingsAvatar(data)
            case "name": return testAPI.postSettingsName(data)
            case "phone": return testAPI.postSettingsPhone(data)
            case "login": return testAPI.postSettingsLogin(data)
            default: return testAPI.postSettingsAvatar(data)
        }
    }
    static postSettingsAvatar = (data: PostSettingsAvatarData): Promise<Response> => {
        console.log(data, "postSettingsAvatar")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    static postSettingsName = (data: PostSettingsNameData): Promise<Response> => {
        console.log(data, "postSettingsName")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    static postSettingsLogin = (data: PostSettingsEmailData): Promise<Response> => {
        console.log(data, "postSettingsLogin")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    static postSettingsPhone = (data: PostSettingsPhoneData): Promise<Response> => {
        console.log(data, "postSettingsPhone")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    static postLogout = (): Promise<Response> => {
        console.log("postLogout")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    static postDelete = (): Promise<Response> => {
        console.log("postDelete")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }

    // ------CREATE-ANNOUNCEMENT-PAGE---//
    static postNewAnnouncement = (data: NewAnnouncementData): Promise<Response> => {
        console.log(data, "postNewAnnouncement")
        return fetch(`https://5faa7de0b5c645001602aa4e.mockapi.io/responseForPost`)
    }
}