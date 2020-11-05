import React from 'react';
import "./contactsPageStyles.css"
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";


const ContactsPage = (props: any) => {

    return (
        <div className={"contactsPage fullHeightContent"}>
            <Header/>
            <div className="contactsPage__container container">
                <div className="contactsPage__contacts">
                    <h2 className="contactsPage__contacts-title">Уважаемые пользователи!</h2>
                    <p className="contactsPage__contactsPage-content">
                        Lorem ipsum dolor sit amet,
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
