
export const getIsRegistrationSelector = (state: any) => state.authorizationState.isRegistration
export const getIsAuthSelector = (state: any) => state.authorizationState.isAuth()
export const getIsFetchingAuthStateSelector = (state: any) => state.authorizationState.isFetching
export const getIsErrorFetchingAuthStateSelector = (state: any) => state.authorizationState.isErrorFetch
export const getIsExistUserSelector = (state: any) => state.authorizationState.isExistUser
export const getIsCorrectAuthDataSelector = (state: any) => state.authorizationState.isCorrectAuthData