import React, {useCallback, useState} from 'react';
import "./searchBoxStyles.css";
import Select from "./select/select";
import {useDispatch, useSelector} from "react-redux";
import {getAnnouncementsByFiltersThunk} from "../../redux/thunks/thunks";
import Button from "../button/button";
import {
    getCategoriesDataSelector,
    getSubwayStationsDataSelector, getTheSubCategoriesSelector
} from "../../redux/reducers/mainState/mainStateSelectors";
import {
    getIsFetchingSearchReducerSelector,
    getSearchConfigCategorySelector,
    getSearchConfigSearchValueSelector,
    getSearchConfigSubwayStationsSelector
} from "../../redux/reducers/searchBoxState/searchBoxStateSelectors";
import {useHistory} from 'react-router-dom';
import {
    resetToInitialStateSearchReducerAC,
    setSearchConfigCategoryAC,
    setSearchConfigSearchValueAC,
    setSearchConfigSubwayStationsAC
} from '../../redux/reducers/searchBoxState/searchBoxStateActionCreators';
import {GET_PATH_SEARCH} from "../../app/App";

const SearchBox = (props: any) => {

    const {placeHolder, className} = props

    //------USE-HISTORY-----//
    const {location : {pathname}, push} = useHistory()

    //------MAP-STATE-TO-PROPS-----//
    const subwayStationsData = useSelector(getSubwayStationsDataSelector)
    const categoriesData = useSelector( (state) =>
        getTheSubCategoriesSelector(getCategoriesDataSelector(state), "bg-warning font-weight-bold text-center"))
    const isFetching = useSelector(getIsFetchingSearchReducerSelector)
    const searchConfigCategory = useSelector(getSearchConfigCategorySelector)
    const searchConfigSubwayStation = useSelector(getSearchConfigSubwayStationsSelector)
    const searchConfigSearchValue = useSelector(getSearchConfigSearchValueSelector)

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getAnnouncementsByFilters = useCallback(() => dispatch(getAnnouncementsByFiltersThunk()), [dispatch])
    const resetToInitialStateSearchReducer = useCallback(() => dispatch(resetToInitialStateSearchReducerAC()), [dispatch])
    const setSearchConfigCategory = useCallback((category) => dispatch(setSearchConfigCategoryAC(category)), [dispatch])
    const setSearchConfigSubwayStation = useCallback((station) => dispatch(setSearchConfigSubwayStationsAC(station)), [dispatch])
    const setSearchConfigSearchValue = useCallback((value) => dispatch(setSearchConfigSearchValueAC(value)), [dispatch])

    //-----LOCAL-STATE-----//
    const [searchValue, setSearchValue] = useState(searchConfigSearchValue)


    const selectItemOnChangeHandler = (field: "category" | "subway", selectItem: any, setIsActiveSelect:Function) => {
        field === "category" && setSearchConfigCategory(selectItem)
        field === "subway" && setSearchConfigSubwayStation(selectItem)
        setIsActiveSelect(false)
    }

    const searchOnChangeHandler = (event?: any) => {
        const { target : {value = ""} = {} } = event || {}
        setSearchValue(value)
    }

    const onClickFindBtnHandler = () => {
        getAnnouncementsByFilters()
        resetToInitialStateSearchReducer()
        const newPathname = GET_PATH_SEARCH(searchConfigCategory.category)
        pathname !== newPathname && push(newPathname)
    }

  return (
      <>
          <div className={`searchBox rounded bg-info p-0 mx-auto d-flex col-lg-10 input-group justify-content-center ${className}`}>
              <Select className={"col-lg-4 p-2 input-group-prepend"} onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("subway", selectItem, handler)} value={searchConfigSubwayStation.name} selectItems={subwayStationsData}/>
              <div className="searchBox__search col-lg-3 p-2 d-flex">
                  <input onBlur={({target: {value}}) => setSearchConfigSearchValue(value)} onChange={searchOnChangeHandler}
                         className={"searchBox__search-input w-100 form-control pr-5"}
                         value={searchValue} type="text"
                         placeholder={placeHolder}/>
                  <div onClick={() => setSearchValue("")} className={"searchBox__search-clear"}>&#10006;</div>
              </div>
              <Select className={"col-lg-3 p-2 input-group-append"} onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("category", selectItem, handler)} value={searchConfigCategory.name} selectItems={categoriesData}/>
              <div className="input-group-append p-2 col-md-6 col-lg-2">
                  <Button svgIconName={"search"} className={"btn-warning w-100"} onClickHandler={onClickFindBtnHandler} label={"Найти"} isDisabled={isFetching}/>
              </div>
          </div>
          <hr className={"my-4"}/>
    </>
  );
}

export default SearchBox;
