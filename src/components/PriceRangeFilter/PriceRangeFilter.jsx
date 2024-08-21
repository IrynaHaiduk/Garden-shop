import React from 'react';
import "./PriceRangeFilter.scss";

const PriceRangeFilter = ({minPrice, maxPrice, setMinPrice, setMaxPrice}) => {
    return (

        <div className="price-range-filter">

            <div className="price-range-filter__item">
                <label htmlFor="minPrice" className='visually-hidden'>Min Price</label>
                <input
                    type="text"
                    id="minPrice"
                    className='price-range-filter__input'
                    name="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder='from'
                />
            </div>

            <div className="price-range-filter__item">
                <label htmlFor="maxPrice" className='visually-hidden'>Max Price</label>
                <input
                    type="text"
                    id="maxPrice"
                    className='price-range-filter__input'
                    name="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder='to'
                />
            </div>
        </div>
    )
}

export default PriceRangeFilter
