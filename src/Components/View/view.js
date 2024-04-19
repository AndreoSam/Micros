import React, { useEffect, useState } from 'react'
import "./view.css"
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDrinkdata, getFooddata, singleCustomerdata } from '../../Reducer/mediaSlice'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'

const View = () => {
  const [state, setState] = useState([])
  const [food, setFood] = useState([])
  const [drink, setDrink] = useState([])

  let { id } = useParams()
  // console.log("ID: ", id);

  const dispatch = useDispatch()

  //get single customer
  const getCustomer = (() => {
    dispatch(singleCustomerdata(id))
      .then((res) => {
        // console.log("Get data: ", res.payload);
        setState(res.payload)
      })
      .catch((err) => {
        console.log("Get Error: ", err);
      })
  })

  //get food
  const getFood = (() => {
    dispatch(getFooddata())
      .then((res) => {
        console.log("Get data: ", res.payload);
        setFood(res.payload)
      })
      .catch((err) => {
        console.log("Get Error: ", err);
      })
  })

  //get drink
  const getDrink = (() => {
    dispatch(getDrinkdata())
      .then((res) => {
        console.log("Get data: ", res.payload);
        setDrink(res.payload)
      })
      .catch((err) => {
        console.log("Get Error: ", err);
      })
  })

  useEffect(() => {
    getCustomer();
    getFood();
    getDrink();
  }, [dispatch])

  return (
    <div className='view_css'>
      <div className='view_css_2'>
        <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
          <Button variant='primary' style={{ width: "100px" }}>
            Back
          </Button>
        </Link>
        <div className='view_details'>
          <div className='view_details_single'><b>Name: </b>{state.name}</div>
          <div className='view_details_single'><b>Table No: </b>{state.table_number}</div>
          <div className='view_details_single'><b>Room No: </b>{state.room_number}</div>
          <div className='view_details_single'><b>Category: </b>{state.category}</div>
          <div className='view_details_single'><b>Status: </b>{state.status}</div>
        </div>
        <div className='view_orders'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Food Name</th>
                <th>
                  <Button variant="success" size="sm">
                    <Link to={`/food/${state.id}`} style={{ textDecoration: "none", color: 'white' }}>
                      Add
                    </Link>
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                food.map((prod) => (
                  <React.Fragment key={prod.id}>
                    <tr>
                      <td>
                        {prod.food_id}
                      </td>
                      <td colSpan={2}>{prod.food_name}</td>
                    </tr>
                  </React.Fragment>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div className='view_orders'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th >Drink Name</th>
                <th>
                  <Button variant="success" size="sm">
                    <Link to={`/drink/${state.id}`} style={{ textDecoration: "none", color: 'white' }}>
                      Add
                    </Link>
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                drink.map((prod) => (
                  <React.Fragment key={prod.id}>
                    <tr>
                      <td>
                        {prod.drink_id}
                      </td>
                      <td colSpan={2}>{prod.drink_name}</td>
                    </tr>
                  </React.Fragment>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default View