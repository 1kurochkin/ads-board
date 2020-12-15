import React, {useCallback, useEffect} from 'react';
import ModalWindow from "../modalWindow";
import ContestPopupBox from "./contestPopupBox";
import {useDispatch, useSelector} from "react-redux";
import {getMyAnnouncementsThunk, getSubwayStationsThunk} from "../../../redux/thunks/thunks";
import {setIsVisibleContestBannerAC} from "../../../redux/reducers/mainState/mainStateActionCreators";
import {getIsAuthSelector} from "../../../redux/reducers/authorizationState/authorizationStateSelectors";
import {getMyAnnouncementsSelector} from "../../../redux/reducers/myAnnouncementState/myAnnouncementStateSelectors";

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
