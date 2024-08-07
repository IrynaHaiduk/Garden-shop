import React from 'react';
import iconInstagram from "../../images/icons/icon-instagram.svg";
import iconWhatsapp from "../../images/icons/icon-whatsapp.svg";

const Footer = () => {
  return (
    <footer>
      <section className="contacts">
        <div className="container">
          <h2 className="contacts__title">
            Contact
          </h2>

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
            <li className="contacts__item contact">
              <h3 className="contact__header">
                Socials
              </h3>
              <div className="contact__content">
                <ul className="contact__socials socials">
                  <li className="socials__item">
                    <a href="#" className="socials__link" target="_blank" rel="noopener noreferrer" aria-label='Go to Instagram'>
                      <img src={iconInstagram} alt="Go to Instagram" />
                    </a>
                  </li>
                  <li className="socials__item">
                    <a href="#" className="socials__link" target="_blank" rel="noopener noreferrer" aria-label='Go to Whatsapp'>
                      <img src={iconWhatsapp} alt="Go to Whatsapp" />
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.40904277986!2d13.372469776926822!3d52.50793613712235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1sru!2sam!4v1723017895297!5m2!1sru!2sam" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

        </div>
      </section>


    </footer>
  )
}

export default Footer
