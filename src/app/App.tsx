import React from 'react';
import "./appStyles.css"
import ModalWindow from "../components/modalWindow/modalWindow";
import AuthorizationPopupBox from "../components/modalWindow/authorizationPopupBox/authorizationPopupBox";

const App = () => {

  return (
    <div className="App">
        <ModalWindow isActiveFromProps={true}>
            <AuthorizationPopupBox/>
        </ModalWindow>
    </div>
  );
}

export default App;
