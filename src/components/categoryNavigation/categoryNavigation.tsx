import React from 'react';
import {useSelector} from "react-redux";
import {getCategoriesDataSelector} from "../../redux/reducers/mainState/mainStateSelectors";
import CategoryNavigationButton from "../categoryNavButton/categoryNavigationButton";

const CategoryNavigation: React.FC<any> = (props) => {

  //------MAP-STATE-TO-PROPS-----//
  const categoriesData = useSelector( (state) => getCategoriesDataSelector(state))

  return (
      <div className="col-lg-2 col-md-3 col-sm-12 p-0 categoryNavigation">
          {categoriesData.map( (categoryData: any) => {
              const {id, name, category, subCategories = []} = categoryData
              return <>
                  <CategoryNavigationButton key={id} category={category} activeClassName={"text-warning"} configCategory={categoryData}>
                      <h5>{name}</h5>
                  </CategoryNavigationButton>
                  {subCategories.map( (subCategoryData: any) => {
                      const {id, name, category} = subCategoryData
                      return <CategoryNavigationButton key={id} activeClassName={"text-warning"} category={category} configCategory={subCategoryData}>
                          <h6>- {name}</h6>
                      </CategoryNavigationButton> } )}
              </> } )}
          <hr className={"my-4"}/>
      </div>
  )
}

export default CategoryNavigation;