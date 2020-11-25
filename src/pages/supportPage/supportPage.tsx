import React from 'react';
import useSetMetaTitleAndDescription from "../../hooks/useSetMetaTitleAndDescription";


const SupportPage = (props: any) => {

    useSetMetaTitleAndDescription(
        "Поддержка",
        "Страница обращения в поддержку Salam.ru"
    )

    return (
        <div className="contactsPage__container container-lg pb-5 pt-5 text-center">
            <div className="jumbotron p-4">
                <h1 className="display-5">Поддержка</h1>
                <hr className="my-4"/>
                <h5 className={"mb-3"}>Уважаемые пользователи!</h5>
                <p className="lead text-left">
                    Вы можете связаться с нами по почте - <span className={"font-weight-bold"}>salamkgru@yandex.ru</span>, по:<br/>
                    - Вопросам, связанным с размещением объявления на сайте и другими техническими вопросами. Тема письма "в Службу поддержки". При обращении в Службу поддержки указывайте e-mail указанный при регистрации и логин, в противном случае оно рассматриваться не будет.<br/>
                    - Вопросам технической поддержки рекламодателей, партнеров.
                </p>
            </div>
        </div>

    );
}

export default SupportPage;
