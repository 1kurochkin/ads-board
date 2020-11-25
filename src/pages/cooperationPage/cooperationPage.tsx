import React from 'react';
import useSetMetaTitleAndDescription from "../../hooks/useSetMetaTitleAndDescription";


const CooperationPage = (props: any) => {

    useSetMetaTitleAndDescription(
        "Сотрудничество",
        "Страница сотрудничества с Salam.ru"
    )

    return (
        <div className="contactsPage__container container-lg pb-5 pt-5 text-center">
            <div className="jumbotron p-4">
                <h1 className="display-5">Сотрудничество</h1>
                <hr className="my-4"/>
                <h5 className={"mb-3"}>Уважаемые пользователи!</h5>
                <p className="lead">
                    У нас на сайте вы можете разместить баннер с рекламой своей продукции или услуги.<br/>
                    По вопросам размещения и любым коммерческим предложениям, пишите на почту – <span className={"font-weight-bold"}>salamkgru@yandex.ru</span>.
                </p>
            </div>
        </div>

    );
}

export default CooperationPage;
