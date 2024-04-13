import { configureStore } from '@reduxjs/toolkit'
import reducer from '../Reducer/mediaSlice'

const Store = configureStore({
    reducer: {
        orders: reducer,
    }
})

export default Store