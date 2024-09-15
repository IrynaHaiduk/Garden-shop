import React from 'react';
import './CustomCheckbox.scss';

const CustomCheckbox = ({ title, checked, onChange }) => {
    return (
        <div className="custom-checkbox">
            <label className="custom-checkbox__label">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="custom-checkbox__input"
                />
                <span className="custom-checkbox__box"></span>
                {
                    title && <span className="custom-checkbox__title">
                        {title}
                    </span>
                }
            </label>
        </div>

    );
};

export default CustomCheckbox;
