import React from 'react';
import useSetMetaTitleAndDescription from "../../hooks/useSetMetaTitleAndDescription";

const UnhandledRoutePage = (props: any) => {

    useSetMetaTitleAndDescription(
        "Ошибка 404. Страница не найдена!",
        "Ошибка 404. Страница не найдена!"
    )

    return (
        <div className="">
            <h1>Ошибка 404. Страница не найдена!</h1>
        </div>
    );
}

export default UnhandledRoutePage;
