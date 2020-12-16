import React, {useCallback} from 'react';
import ModalWindow from "../modalWindow";
import ContestPopupBox from "./contestPopupBox";
import {useDispatch} from "react-redux";
import {setIsVisibleContestBannerAC} from "../../../redux/reducers/mainState/mainStateActionCreators";

export type ContestModalWindowTypes = {
  openBtnElement?: any
  isActiveFromProps: boolean
}

const ContestModalWindow = (props: ContestModalWindowTypes) => {

  //-----MAP-DISPATCH-TO-PROPS----//
  const dispatch = useDispatch()
  const setIsVisibleContestBanner = useCallback(() => dispatch(setIsVisibleContestBannerAC(false)), [dispatch])


  const {openBtnElement, isActiveFromProps} = props
  return (
      <ModalWindow alertCloseHandler={setIsVisibleContestBanner} isActiveFromProps={isActiveFromProps} withOpenBtn={true} modal={<ContestPopupBox/>}>{ (openModalWindow:any) =>
          openBtnElement && React.cloneElement(openBtnElement, {onClickHandler: openModalWindow})
      }</ModalWindow>
  );
}

export default React.memo(ContestModalWindow);
