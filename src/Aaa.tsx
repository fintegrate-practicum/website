import React from 'react'
import { useAppDispatch } from './Redux/hooks';
import { getBusinessData } from './Redux/businessSlice';

const Aaa = () => {

    const dispatch = useAppDispatch();
    const aaa= dispatch(getBusinessData());
    console.log(aaa);
    console.log(dispatch(getBusinessData()));
    
  return (
    <div>aaa </div>

  )
}

export default Aaa