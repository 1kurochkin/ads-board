
export const getIsRegistrationSelector = (state: any) => state.authorizationState.isRegistration
export const getIsAuthSelector = (state: any) => state.authorizationState.isAuth()
export const getIsExistUserSelector = (state: any) => state.authorizationState.isExistUser
export const getIsCorrectAuthDataSelector = (state: any) => state.authorizationState.isCorrectAuthData