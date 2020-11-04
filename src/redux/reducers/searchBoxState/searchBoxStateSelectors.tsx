export const getSearchedDataSelector = (state: any) => state.searchBoxState.searchedData
export const getSubwayStationsDataSelector = (state: any) => state.searchBoxState.subwayStationsData
export const getCategoriesDataSelector = (state: any) => state.searchBoxState.categoriesData

export const floatingSubCategoriesSelector = (categoriesData: any) => {
    const isIncludesSubCategory = (category: any) => "subCategories" in category
    const prepareCategoryToPush = (category: any) => {
        const {id, label} = category
        const baseCategory = {id, label}
        return isIncludesSubCategory(category) ?
            {...baseCategory, className: "selectItem__main-category"} : baseCategory
    }
    return categoriesData.reduce( (floatedCategories: any, category: any) => {
        const {subCategories} = category
        floatedCategories.push(prepareCategoryToPush(category))
        isIncludesSubCategory(category) && floatedCategories.push(...subCategories)
        return floatedCategories
    }, [] )
}

export const getIsFetchingSelector = (state: any) => state.searchBoxState.isFetching
export const getCurrentPageSearchReducerSelector = (state: any) => state.searchBoxState.currentPage
export const getTotalNumOfPageSearchReducerSelector = (state: any) => state.searchBoxState.totalNumOfPages