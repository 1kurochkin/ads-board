export const getSearchedDataSelector = (state: any) => state.searchBoxState.searchedData
export const getSearchConfigCategorySelector = (state: any) => state.searchBoxState.searchConfig.categoryId
export const getSearchConfigSubwayStationsSelector = (state: any) => state.searchBoxState.searchConfig.subwayStations
export const getSearchConfigSearchValueSelector = (state: any) => state.searchBoxState.searchConfig.searchValue
export const getIsFetchingSearchReducerSelector = (state: any) => state.searchBoxState.isFetching
export const getCurrentPageSearchReducerSelector = (state: any) => state.searchBoxState.currentPage
export const getTotalNumOfPageSearchReducerSelector = (state: any) => state.searchBoxState.totalNumOfPages