import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCustomerdata } from '../../Reducer/mediaSlice'

const Home = () => {
    const [state, setState] = useState([])
    const dispatch = useDispatch()

    //get orders
    const getOrder = () => {
        dispatch(getCustomerdata())
            .then((res) => {
                console.log("Get data: " + res);
            })
            .catch((err) => {
                console.log("Get Error: ", err);
            })
    }

    useEffect(() => {
        getOrder();
    }, [dispatch])


    return (
        <div>Home</div>
    )
}

export default Home