import React from 'react';
import "./Contacts.scss";
import Heading from '@/components/Heading/Heading';
import Map from '@/components/Map/Map';
import Socials from '../Socials/Socials';

const Contacts = () => {
    return (
        <section className="contacts">
            <div className="container">
                <Heading title="Contact" />

                <ul className="contacts__list">
                    <li className="contacts__item contact">
                        <h3 className="contact__header">
                            Phone
                        </h3>
                        <div className="contact__content">
                            <a href="tel:+499999999999">
                                +49 999 999 99 99
                            </a>
                        </div>
                    </li>
                    <li className="contacts__item contact contact--row">
                        <h3 className="contact__header">
                            Socials
                        </h3>
                        <div className="contact__content">
                            < Socials />
                        </div>
                    </li>
                    <li className="contacts__item contact">
                        <h3 className="contact__header">
                            Address
                        </h3>
                        <div className="contact__content">
                            <a href="https://www.google.com/maps/search/Linkstra%C3%9Fe+2,+8+OG,+10%E2%80%AF785,+Berlin,+Deutschland/@52.5058271,13.3713796,14z/data=!3m1!4b1?entry=ttu" target="_blank" rel="noopener noreferrer" aria-label='Go to GoogleMaps'>
                                Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
                            </a>
                        </div>
                    </li>
                    <li className="contacts__item contact">
                        <h3 className="contact__header">
                            Working Hours
                        </h3>
                        <div className="contact__content">
                            <p>
                                24 hours a day
                            </p>
                        </div>
                    </li>
                </ul>

                <Map />

            </div>
        </section>
    )
}

export default Contacts
