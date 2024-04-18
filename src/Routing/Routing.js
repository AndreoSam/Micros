import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Add from '../Components/Add/add'
import Edit from '../Components/Edit/edit'
import Food from '../Components/Add/Food/food'
import Drink from '../Components/Add/Drink/drink'
import View from '../Components/View/view'

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='add' element={<Add />} />
                <Route path='food' element={<Food />} />
                <Route path='drink' element={<Drink />} />
                <Route path='view' element={<View />} />
                <Route path='edit/:id' element={<Edit />} />
            </Routes>
        </Router >
    )
}

export default Routing