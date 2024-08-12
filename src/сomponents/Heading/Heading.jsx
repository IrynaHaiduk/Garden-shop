import React from 'react'
import { Link } from 'react-router-dom';
import "./Heading.scss";

const Heading = ({ title, subtitle, link }) => {
    return (
        <div className="heading">
            <h2 className="heading__title">
                {title}
            </h2>

            {subtitle && link &&
                <div className="heading__block">
                    <div className="heading__decor"></div>
                    <Link to={`/${link}`} className='heading__link'>
                        {subtitle}
                    </Link>
                </div>
            }

        </div>
    )
}

export default Heading
