// ------AUTHORIZATION-TYPES-----//
export type AuthorizationData = { login: string, password: string }
export type RegistrationData = { name: string,  login: string, password: string }

// ------CREATE-ANNOUNCEMENT-PAGE---//?
export type NewAnnouncementData = {
    categoryId: number,
    name: string,
    description: string
    photos?: Array<string>,
    price: number,
    subwayStations: Array<string>,
    sellerPhone: string
}

// ------SEARCH-BOX-TYPES-----//???
export type GetAnnouncementsCategoryType = "all" |  "housing" | "job" | "trading"

// ------SETTINGS-TYPES---//
export type PostSettingsAvatarData = { avatar: string }
export type PostSettingsNameData = { name: string }
export type PostSettingsEmailData = { email: string }
export type PostSettingsPhoneData = { phone: string }
export type PostSettingsNewPasswordData = { oldPassword: string, newPassword: string }

// ------POST-MAIL-TO-SUPPORT-TYPES----//
export type PostMailToSupportDataTypes = { mail: string }


export class testAPI {

    static baseUrl = '/json/'

    // ------AUTHORIZATION-----//
    static postAuthorizationData = (data: AuthorizationData): Promise<Response> => {
        console.log(data, "postAuthorizationData")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    static postRegistrationData = (data: RegistrationData): Promise<Response> => {
        console.log(data, "postRegistrationData")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    // ------FEED-PAGE-----//
    //@response  20 последних объявлений
    static getLastAnnouncements = (): Promise<Response> => {
        console.log("getLastAnnouncements")
        const path = `getMyAnnouncements`
        return fetch(`${testAPI.baseUrl}announcements.json`)
    }

    // ------SEARCH-BOX-----//
    static getSubwayStations = (): Promise<Response> => {
        console.log("getSubwayStations")
        return fetch(`${testAPI.baseUrl}subwayStations.json`)
    }

    static getAnnouncementsByFilters = (page: number, name?: string, category?: string| number, subway?: string| number): Promise<Response> => {
        const path = `getAnnouncementsByFilters?page=${page}&category=${category}&name=${name}&subway=${subway}`
        console.log(page, category, name, subway, "getAnnouncementsByFilters", path)
        return fetch(`${testAPI.baseUrl}announcements.json`)
    }

    //---REQUEST-FOR-SEARCH-BOX/FEED-PAGE/HOUSING/JOB/TRADING---//???
    static getAnnouncementsByCategoryAndName = (page: number, name: string, category: GetAnnouncementsCategoryType): Promise<Response> => {
        const path = `getAnnouncementsByCategoryAndName?page=${page}&category=${category}&name=${name}`
        console.log(page, category, name, "getAnnouncementsByCategoryAndName", path)
        return fetch(`${testAPI.baseUrl}announcements.json`)
    }

    // ------GET-ANNOUNCEMENT-BY-ID----//
    static getAnnouncementById = (id: number): Promise<Response> => {
        console.log("getAnnouncementById")
        const path = `getAnnouncementById/${id}`
        return fetch(`${testAPI.baseUrl}announcementById.json`)
    }

    // ------MY-ANNOUNCEMENTS-PAGE---//
    static getMyAnnouncements = (page: number): Promise<Response> => {
        console.log("getMyAnnouncements")
        const path = `getMyAnnouncements?page=${page}`
        return fetch(`${testAPI.baseUrl}announcements.json`)
    }

    // ------FAVORITE-PAGE---//
    static getFavoriteAnnouncements = (page: number): Promise<Response> => {
        console.log("getFavoriteAnnouncements")
        const path = `getFavoriteAnnouncements?page=${page}`
        return fetch(`${testAPI.baseUrl}announcements.json`)
    }

    // ------PUT-ADD-OR-DELETE-LIKE----//
    static putAddOrDeleteLike = (id: number): Promise<Response> => {
        console.log("putAddOrDeleteLike")
        const path = `putAddOrDeleteLike/${id}`
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    // ------SETTINGS-PAGE---//
    static postSettingsAvatar = (data: PostSettingsAvatarData): Promise<Response> => {
        console.log(data, "postSettingsAvatar")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    static postSettingsName = (data: PostSettingsNameData): Promise<Response> => {
        console.log(data, "postSettingsName")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    static postSettingsEmail = (data: PostSettingsEmailData): Promise<Response> => {
        console.log(data, "postSettingsEmail")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    static postSettingsPhone = (data: PostSettingsPhoneData): Promise<Response> => {
        console.log(data, "postSettingsPhone")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    static postSettingsNewPassword = (data: PostSettingsNewPasswordData): Promise<Response> => {
        console.log(data, "postSettingsNewPassword")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    // ------CREATE-ANNOUNCEMENT-PAGE---//
    static postNewAnnouncement = (data: NewAnnouncementData): Promise<Response> => {
        console.log(data, "postNewAnnouncement")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

    // ------POST-MAIL-TO-SUPPORT---//
    static postMailToSupport = (data: PostMailToSupportDataTypes): Promise<Response> => {
        console.log(data, "postMailToSupport")
        return fetch(`${testAPI.baseUrl}responseForPostOrPutRequests.json`)
    }

}