import React from 'react';
import "./Counter.scss";

const Counter = ({product, incrementCount, decrementCount}) => {

    return (
        <div className="counter">
            <button className="counter__btn counter__btn--minus" onClick={() => decrementCount(product?.id)} disabled={product?.count===1}></button>
            <input className="counter__input" type="text" value={product?.count} disabled readOnly />
            <button className="counter__btn counter__btn--plus" onClick={() => {incrementCount(product?.id)}}></button>
        </div>
    )
}

export default Counter;
