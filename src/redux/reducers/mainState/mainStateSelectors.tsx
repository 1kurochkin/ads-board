export const getSubwayStationsDataSelector = (state: any) => state.mainState.subwayStationsData
export const getCategoriesDataSelector = (state: any) => state.mainState.categoriesData
export const getIsVisibleContestBannerSelector = (state: any) => state.mainState.isVisibleContestBanner()
export const getTheSubCategoriesSelector = (categoriesData: Array<any>, activeClassName?: string) => {
    //Проверка содержит ли объект с категорией подкатегории
    const isIncludesSubCategory = (categoryData: Object) => "subCategories" in categoryData
    //Возвращает подготовленный объект категории
    const prepareCategoryToPush = (categoryData: any) => {
        const {id, name, category} = categoryData
        const baseCategory = {id, name, category}
        return isIncludesSubCategory(categoryData) ?
            {...baseCategory, className: activeClassName} : baseCategory
    }
    //В процессе итерации достаём подкатегории из объекта категории
    return categoriesData.reduce( (newCategoriesData: any, category: any) => {
        const {subCategories} = category
        newCategoriesData.push(prepareCategoryToPush(category))
        isIncludesSubCategory(category) && newCategoriesData.push(...subCategories)
        return newCategoriesData
    }, [] )
}