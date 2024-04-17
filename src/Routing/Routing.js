import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Add from '../Components/Add/add'
import Edit from '../Components/Edit/edit'

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='add' element={<Add />} />
                <Route path='edit/:id' element={<Edit />} />
            </Routes>
        </Router >
    )
}

export default Routing