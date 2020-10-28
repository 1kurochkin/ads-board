
export const getIsExistUserSelector = (state: any) => state.authorizationState.isExistUser
export const getIsAuthSelector = (state: any) => state.authorizationState.isAuth()
export const getIsCorrectAuthDataSelector = (state: any) => state.authorizationState.isCorrectAuthData