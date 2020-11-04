import React, {useCallback, useEffect, useState} from 'react';
import "./searchBoxStyles.css";
import Select from "./select/select";
import {useDispatch, useSelector} from "react-redux";
import {getAnnouncementsByFiltersThunk, getSubwayStationsThunk} from "../../redux/thunks/thunks";
import {
    floatingSubCategoriesSelector,
    getCategoriesDataSelector,
    getIsFetchingSelector,
    getSubwayStationsDataSelector
} from "../../redux/reducers/searchBoxState/searchBoxStateSelectors";
import Button from "../button/button";

const SearchBox = (props: any) => {

    const initialStateSubway = {id: "", label: "Станция метро"}
    const initialStateCategory = {id: "", label: "Выбор категории"}

    const {placeHolder} = props

    //------MAP-STATE-TO-PROPS-----//
    const {subwayStationsData, categoriesData, isFetching} = useSelector((state) => ({
        subwayStationsData: getSubwayStationsDataSelector(state),
        categoriesData: floatingSubCategoriesSelector(getCategoriesDataSelector(state)),
        isFetching: getIsFetchingSelector(state),
    }) )

    //-----MAP-DISPATCH-TO-PROPS----//
    const dispatch = useDispatch()
    const getSubwayStations = useCallback(() => dispatch(getSubwayStationsThunk()), [dispatch])
    const getAnnouncementsByFilters = useCallback((name, category, subway) => dispatch(getAnnouncementsByFiltersThunk(name, category, subway)), [dispatch])

    const [searchValue, setSearchValue] = useState("")
    const [{id: subwayId, label: subwayLabel}, setCurrentSubwayStation] = useState(initialStateSubway)
    const [{id: categoryId, label: categoryLabel}, setCurrentCategory] = useState(initialStateCategory)

    useEffect(() => {
        getSubwayStations()
    }, [])

    const selectItemOnChangeHandler = (field: "category" | "subway", selectItem: any, setIsActiveSelect:Function) => {
        field === "category" && setCurrentCategory(selectItem)
        field === "subway" && setCurrentSubwayStation(selectItem)
        setIsActiveSelect(false)
    }

    const searchOnChangeHandler = (event?: any) => {
        const { target : {value = ""} = {} } = event || {}
        setSearchValue(value)
    }

    const onClickSearchBtnHandler = () => getAnnouncementsByFilters(searchValue, subwayId, categoryId)

    const onClickResetBtnHandler = () => {
        setSearchValue("")
        setCurrentSubwayStation(initialStateSubway)
        setCurrentCategory(initialStateCategory)
    }

  return (
      <div className="searchBox">
          <Select onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("subway", selectItem, handler)} value={subwayLabel} selectItems={subwayStationsData} placeHolder={"Выбор категории"}/>
          <div className="searchBox__search">
              <input onChange={searchOnChangeHandler}
                     className={"searchBox__search-input"}
                     value={searchValue} type="text"
                     placeholder={placeHolder}/>
              <div onClick={() => setSearchValue("")} className={"searchBox__search-clear"}>&#10006;</div>
          </div>
          <Select onChangeHandlerSelectItem={(selectItem: any, handler: any) => selectItemOnChangeHandler("category", selectItem, handler)} value={categoryLabel} selectItems={categoriesData} placeHolder={"Метро"}/>
          <Button onClickHandler={onClickSearchBtnHandler} label={"Найти"} isDisabled={isFetching}/>
          <Button onClickHandler={onClickResetBtnHandler} label={"Очистить"} isDisabled={false}/>
      </div>
  );
}

export default SearchBox;
