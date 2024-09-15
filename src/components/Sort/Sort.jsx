import React from 'react';
import "./Sort.scss";
import { useState } from 'react';

const Sort = ({ labels, onSelect, defaultSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSort = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        onSelect(option);
        toggleSort();
    }

    return (
        <div className="sort">
            <div className="sort__label" onClick={toggleSort}>
                {defaultSelect.label}
            </div>

            {isOpen && (
                <div className="sort__content">

                    {
                        labels && labels.map(item => (
                            <div key={item.id} className='sort__item' onClick={() => handleOptionClick(item)}>
                                {item.label}
                            </div>
                        ))
                    }

                </div>
            )}

        </div>
    )
}

export default Sort
