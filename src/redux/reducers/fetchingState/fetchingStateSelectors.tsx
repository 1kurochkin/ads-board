export const getIsFetchingSelector = (state: any, field: string) => state.fetchingState[field].isFetching
export const getIsEmptyResponseSelector = (state: any, field: string) => state.fetchingState[field].isEmptyResponse
export const getIsErrorFetchSelector = (state: any, field: string) => state.fetchingState[field].isErrorFetch
