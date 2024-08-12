import React from 'react';
import iconInstagram from "../../images/icons/icon-instagram.svg";
import iconWhatsapp from "../../images/icons/icon-whatsapp.svg";
import "./Contacts.scss";
import Heading from '../Heading/Heading';

const Contacts = () => {
    return (
        <section className="contacts">
            <div className="container">
                <Heading title="Contact"/>
                
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
                            <ul className="contact__socials socials">
                                <li className="socials__item">
                                    <a href="#" className="socials__link" target="_blank" rel="noopener noreferrer" aria-label='Go to Instagram'>
                                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.5 0H9.5C4.27546 0 0 4.27361 0 9.5V28.5C0 33.7245 4.27546 38 9.5 38H28.5C33.7245 38 38 33.7245 38 28.5V9.5C38 4.27361 33.7245 0 28.5 0ZM19 26.9164C14.6271 26.9164 11.0832 23.3709 11.0832 19C11.0832 14.6271 14.6271 11.0832 19 11.0832C23.3709 11.0832 26.9168 14.6271 26.9168 19C26.9168 23.3709 23.3709 26.9164 19 26.9164ZM29.2918 11.0832C27.9789 11.0832 26.9168 10.0196 26.9168 8.70818C26.9168 7.39673 27.9789 6.33318 29.2918 6.33318C30.6047 6.33318 31.6668 7.39673 31.6668 8.70818C31.6668 10.0196 30.6047 11.0832 29.2918 11.0832Z" fill="#424436" />
                                        </svg>                                   </a>
                                </li>
                                <li className="socials__item">
                                    <a href="#" className="socials__link" target="_blank" rel="noopener noreferrer" aria-label='Go to Whatsapp'>
                                        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.959 3C11.4824 3 2.95898 11.5228 2.95898 22C2.95898 25.6862 4.01598 29.24 6.02236 32.3263L3.06165 39.2348C2.85755 39.7098 2.96393 40.2628 3.33008 40.6289C3.57253 40.8714 3.89661 41 4.22565 41C4.39388 41 4.56396 40.9666 4.72477 40.8973L11.6333 37.936C14.7189 39.9436 18.2728 41 21.959 41C32.4362 41 40.959 32.4772 40.959 22C40.959 11.5228 32.4362 3 21.959 3ZM31.7113 28.8009C31.7113 28.8009 30.1317 30.8271 28.99 31.3008C26.088 32.502 21.9911 31.3008 17.324 26.635C12.6581 21.9678 11.4564 17.871 12.6581 14.969C13.1319 13.826 15.1581 12.2477 15.1581 12.2477C15.7073 11.8197 16.5608 11.8729 17.0531 12.3652L19.3452 14.6573C19.8376 15.1496 19.8376 15.9561 19.3452 16.4484L17.9066 17.8858C17.9066 17.8858 17.324 19.6349 20.8234 23.1355C24.3229 26.635 26.0732 26.0523 26.0732 26.0523L27.5105 24.6137C28.0029 24.1214 28.8094 24.1214 29.3017 24.6137L31.5938 26.9059C32.0861 27.3982 32.1393 28.2505 31.7113 28.8009Z" fill="#424436" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="contacts__item contact">
                        <h3 className="contact__header">
                            Address
                        </h3>
                        <div className="contact__content">
                            <a href="https://www.google.com/maps/search/Linkstra%C3%9Fe+2,+8+OG,+10%E2%80%AF785,+Berlin,+Deutschland/@52.5058271,13.3713796,14z/data=!3m1!4b1?entry=ttu" target="_blank" rel="noopener noreferrer" aria-label='Go to GoogleMaps'>
                                Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
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

                <div className="contacts__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.40904277986!2d13.372469776926822!3d52.50793613712235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1sru!2sam!4v1723017895297!5m2!1sru!2sam"
                        width="600"
                        height="450"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Embed"
                    ></iframe>
                </div>

            </div>
        </section>
    )
}

export default Contacts
