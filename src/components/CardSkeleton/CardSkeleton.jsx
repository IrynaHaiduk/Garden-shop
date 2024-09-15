import React from 'react';
import "./CardSkeleton.scss";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = ({cards}) => {
    return (
        <div className='card-skeleton'>
        </div>
    )
}

export default CardSkeleton
