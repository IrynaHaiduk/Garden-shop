import React from 'react';
import "./Map.scss";
import mapImg from "@/images/map.jpg";
import { useState } from 'react';

const Map = () => {
    // State to track whether there was an error loading the Google Maps iframe
    const [isMapError, setIsMapError] = useState(false);
    const googleMapsLink = "https://www.google.com/maps?q=Starta+Institute+by+Tel-Ran&ll=52.50793613712235,13.372469776926822&z=16";
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.40904277986!2d13.372469776926822!3d52.50793613712235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1sru!2sam!4v1723017895297!5m2!1sru!2sam";
    const handleMapError = () => {
        setIsMapError(true);
    };

    return (
        <div className="map">
            {isMapError ? (
                <img src={mapImg} alt="Map" className="map__img" />
            ) : (
                <a href={googleMapsLink} className="map__link" target="_blank"
                    rel="noopener noreferrer" aria-label='Go to the Google Maps'>
                    <iframe
                        src={mapSrc}
                        width="600"
                        height="450"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Embed"
                        onError={handleMapError}
                        className="contacts__map-iframe"
                    ></iframe>
                    <div className="map__overlay"></div> {/* Invisible clickable overlay */}
                </a>
            )}
        </div>
    )
}

export default Map
