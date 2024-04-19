import React, { useState } from 'react'
import "./add.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { postCustomerdata } from '../../Reducer/mediaSlice';
import { useDispatch } from 'react-redux';

const Add = () => {
    const [roomnumber, setRoomnumber] = useState(false);
    let [state, setState] = useState({
        name: "",
        status: "Unpaid",
        room_number: "",
        table_number: "",
        category: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [categoryerror, setCategoryerror] = useState(false);
    const [tableerror, setTableerror] = useState(false);
    const [roomnumbererror, setRoomnumbererror] = useState(false);
    const [validated, setValidated] = useState(false);

    const changeHandler = ((event) => {
        const atLeastOneChecked = document.querySelector('input[type="radio"]:checked') !== null;

        let { name, value } = event.target;
        // console.log(name, value);
        switch (name) {
            case "table_number":
                if (!value) {
                    setTableerror(true)
                }
                break;

            case "category":
                if (atLeastOneChecked) {
                    setCategoryerror(false)
                    // console.log(value);
                    if (value === "In House") {
                        setRoomnumber(true)
                        console.log(value, "Open");
                    }
                    else {
                        setRoomnumber(false)
                        console.log(value, "Closed");
                    }
                }
                break;

            case "room_number":
                if (!value) {
                    setRoomnumbererror(true)
                }
                break;

            default:
                console.log("");

        }
        setState({ ...state, [name]: value })
    })


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const atLeastOneChecked = document.querySelector('input[type="radio"]:checked') !== null;
        event.preventDefault();

        if (form.checkValidity() === true && !tableerror && atLeastOneChecked && !roomnumbererror) {
            // let details = {
            //     id: id,
            //     name: state.name,
            //     status: state.status,
            //     room_number: state.room_number,
            //     table_number: state.table_number,
            //     category: state.category
            // }
            if (state.room_number === "Walk In") {
                setCategoryerror(false)
                setRoomnumbererror(false)
                setValidated(false);
            }
            else if (state.room_number === "In House") {
                setRoomnumbererror(true)
                setCategoryerror(false)
                setValidated(false);
            }

            event.stopPropagation();
            dispatch(postCustomerdata(state))
                .then((prod) => {
                    navigate(`/option/${prod.payload.id}`)
                    // console.log("PROD: ", prod.payload.id);
                })
        }
        else {
            setCategoryerror(true);
            setValidated(true);
            // setRoomnumbererror(true);
        }
    };
    // console.log("category Error: " + categoryerror);
    // console.log("Validate Error: " + validated);

    return (
        <div className="add_page_div">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="add_page_div_2">
                    <Form.Group controlId="validationCustom03" className='table_number_css'>
                        <Form.Label style={{ fontWeight: "600", fontSize: "30px", margin: 0 }}>Table Number</Form.Label>
                        <Form.Control type="number" placeholder="Table no." name="table_number" required style={{ width: "auto" }} onChange={changeHandler} />
                        <Form.Control.Feedback type="invalid" >
                            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "400", margin: 0 }}>
                                *Please enter the table number!
                            </p>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom03" className='table_number_css'>
                        <Form.Label style={{ fontWeight: "600", fontSize: "30px", margin: 0 }}>Name</Form.Label>
                        <Form.Control type="text" placeholder="Customer name" name="name" required style={{ width: "auto" }} onChange={changeHandler} />
                        <Form.Control.Feedback type="invalid" >
                            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "400", margin: 0 }}>
                                *Please enter the name of the customer!
                            </p>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div>
                        <ButtonGroup className='category_css'>
                            <label style={{ fontSize: "30px" }}>Category:</label>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className='category_css_1'>
                                    <Form.Check
                                        inline
                                        value="Walk In"
                                        label="Walk In"
                                        name="category"
                                        type={type}
                                        onChange={changeHandler}
                                    />
                                    <Form.Check
                                        inline
                                        value="In House"
                                        label="In House"
                                        name="category"
                                        type={type}
                                        onChange={changeHandler}
                                    />
                                </div>
                            ))}
                            {categoryerror ? <p style={{ color: "rgb(220, 53, 69)", fontSize: "14px", fontWeight: "400", margin: 0 }}>*Please selected from any of the between!</p> : null}
                        </ButtonGroup>
                    </div>
                    <div>
                        {roomnumber && (
                            <div>
                                <label style={{ fontWeight: "600", fontSize: "20px", margin: 0 }}>Room No:</label>
                                <input
                                    type="text"
                                    name="room_number"
                                    onChange={changeHandler}
                                />
                            </div>
                        )}
                        {roomnumbererror ? <p style={{ color: "rgb(220, 53, 69)", fontSize: "14px", fontWeight: "400", margin: 0 }}>*Please enter the room number!</p> : null}
                    </div>

                    <div className='add_page_button'>
                        <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
                            <Button variant='primary' style={{ width: "100px" }}>
                                Back
                            </Button>
                        </Link>

                        <Button variant='success' type='submit' style={{ width: "100px" }} >
                            {/* <Link to={`/food/${state.id}`} style={{ textDecoration: "none", color: "white", width: "100%" }}> */}
                            Next
                            {/* </Link> */}
                        </Button>
                    </div>
                </div>
            </Form>
        </div >
    )
}

export default Add