import React, { useEffect, useState } from 'react'
import "./edit.css"
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { editCustomerdata, getDrinkdata, getFooddata, singleCustomerdata } from '../../Reducer/mediaSlice'
import Badge from 'react-bootstrap/Badge';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';

const Edit = () => {
    const [state, setState] = useState([])
    const [food, setFood] = useState([])
    const [drink, setDrink] = useState([])

    //validation
    let [tablenumbererror, setTablenumbererror] = useState(false)
    let [nameerror, setNameerror] = useState(false)
    let [roomnumbererror, setRoomnumbererror] = useState(false)

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
                // console.log("Get data: ", res.payload);
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
                // console.log("Get data: ", res.payload);
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

    //edit data
    const changeHandler = ((event) => {
        let { name, value } = event.target;
        console.log(name, value);

        switch (name) {
            case "table_number":
                if (!value) {
                    setTablenumbererror(true)
                }
                else {
                    setTablenumbererror(false)
                }
                break;

            case "name":
                if (!value) {
                    setNameerror(true)
                }
                else {
                    setNameerror(false)
                }
                break;

            case "room_number":
                if (!value) {
                    setRoomnumbererror(true)
                }
                else {
                    setRoomnumbererror(false)
                }
                break;

            default:
                break;
        }
        setState({ ...state, [name]: value })
    })

    //submit
    const submitHandler = ((event) => {
        event.preventDefault();
        if (!state.table_number && !state.name && !state.room_number) {
            if (!state.table_number) {
                alert("Please enter table number")
            }
            else if (!state.name) {
                alert("Please enter name")
            }
            else if (!state.room_number) {
                alert("Please enter the room number")
            }
        }
        else {
            if (tablenumbererror === false && nameerror === false && roomnumbererror === false) {
                let updatedCustomerdata = {
                    id: id,
                    name: state.name,
                    room_number: state.room_number,
                    table_number: state.table_number,
                    category: state.category,
                    status: state.status
                }

                dispatch(editCustomerdata(updatedCustomerdata))
                    .then(() => {
                        toast.success('Customer Updated Successful!')
                        alert('Customer Updated Successful!')
                        getCustomer();
                        getDrink();
                        getFood();
                        // handleRender();
                    })
            }
            else {
                alert("Please fix the below errors!");
            }
        }
    })

    // console.log("State: ", state);
    // console.log("Food: ", food);
    // console.log("Drink: ", drink);

    return (
        <div className='edit_page_main_div'>
            <div className='edit_page_main_div_2' >
                <form onSubmit={submitHandler}>
                    <div className='edit_page_labels'>
                        <label>Table No: </label>
                        <input name="table_number" type="number" defaultValue={state.table_number} onChange={changeHandler} />
                    </div>
                    <div className='edit_page_labels'>
                        <label>Name: </label>
                        <input type="text" name="name" defaultValue={state.name} onChange={changeHandler} />
                    </div>
                    <div className='edit_page_labels'>
                        <label>Room No: </label>
                        <input type="text" name="room_number" defaultValue={state.room_number} onChange={changeHandler} />
                    </div>
                    <div>
                        <label>List of all the food items:</label>
                        {
                            food.map((prod) => (
                                <div key={prod.food_id} style={{ display: "flex", justifyContent: "flex-end", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                                    <label>{prod.food_id}.</label>
                                    <input type="text" defaultValue={prod.food_name} onChange={changeHandler} />
                                </div>
                            ))
                        }
                    </div>

                    <div >
                        <label>List of all the drink items:</label>
                        {
                            drink.map((prod) => (
                                <div key={prod.drink_id} style={{ display: "flex", justifyContent: "flex-end", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                                    <label>{prod.drink_id}.</label>
                                    <input type="text" defaultValue={prod.drink_name} onChange={changeHandler} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <b>Status: </b>
                        <Form.Select aria-label="Default select example" name="status" onChange={changeHandler}>
                            <option>Click to chage status</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </Form.Select>
                        {state.status === "Paid" ? (<Badge bg="success">{state.status}</Badge>) : (<Badge bg="danger">{state.status}</Badge>)}
                    </div>

                    <div className='edit_page_button'>

                        <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
                            <Button variant='primary' style={{ width: "100px" }}>
                                Back
                            </Button>
                        </Link>

                        <Button variant='success' type='submit' style={{ width: "100px" }}>
                            {/* <Link style={{ textDecoration: "none", color: "white", width:"100%" }}> */}
                            Update
                            {/* </Link> */}
                        </Button>
                    </div>
                    <div>
                        {tablenumbererror ? <p style={{ color: "red", display: "flex", alignItems: "center" }}>*Table number cannot be empty.</p> : ""}
                        {nameerror ? <p style={{ color: "red", display: "flex", alignItems: "center" }}>*Name cannot be empty.</p> : ""}
                        {roomnumbererror ? <p style={{ color: "red", display: "flex", alignItems: "center" }}>*Room number cannot be empty.</p> : ""}
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Edit