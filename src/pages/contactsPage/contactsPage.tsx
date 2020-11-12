import React from 'react';
import "./contactsPageStyles.css"
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";


const ContactsPage = (props: any) => {

    return (
        <div className={"contactsPage fullHeightContent"}>
            <Header/>

            <div className="contactsPage__container container-lg pb-5 pt-5 text-center">
                <div className="jumbotron p-4">
                    <h1 className="display-5">Уважаемые пользователи!</h1>
                    <hr className="my-4"/>
                    <p className="lead">Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                        Impedit minima perferendis tenetur?
                        Delectus dolores eaque est, explicabo laboriosam minus quia ut vel veniam.
                        Dignissimos fuga, quas quasi quisquam saepe sint.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ContactsPage;
