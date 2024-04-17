import React, { useState } from 'react'
import "./add.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Add = () => {
    let [state, setState] = useState({
        table_number: "",
        radio_group: ""
    })

    const [categoryerror, setCategoryerror] = useState(false);
    const [tableerror, setTableerror] = useState(false);
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

            case "radio_group":
                if (atLeastOneChecked) {
                    setCategoryerror(false)
                }

            default:
                console.log("");

        }
        setState({ ...state, [name]: value })
    })


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const atLeastOneChecked = document.querySelector('input[type="radio"]:checked') !== null;
        event.preventDefault();

        if (form.checkValidity() === true && !atLeastOneChecked) {
            event.stopPropagation();
            setCategoryerror(true)
            setValidated(false);
        }
        else {
            setCategoryerror(false);
            setValidated(true);
        }
    };
    // console.log("category Error: " + categoryerror);


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
                                        label="Walk In"
                                        name="radio_group"
                                        type={type}
                                        onChange={changeHandler}
                                    />
                                    <Form.Check
                                        inline
                                        label="In House"
                                        name="radio_group"
                                        type={type}
                                        onChange={changeHandler}
                                    />
                                </div>
                            ))}
                            {categoryerror === true ? <p style={{ color: "rgb(220, 53, 69)", fontSize: "14px", fontWeight: "400", margin: 0 }}>*Please selected from any of the between!</p> : null}
                        </ButtonGroup>
                    </div>
                    <div className='add_page_button'>

                        <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
                            <Button variant='primary' style={{ width: "100px" }}>
                                Back
                            </Button>
                        </Link>

                        <Button variant='success' type='submit' style={{ width: "100px" }}>
                            {/* <Link style={{ textDecoration: "none", color: "white", width:"100%" }}> */}
                            Next
                            {/* </Link> */}
                        </Button>
                    </div>
                    <div className='error_css'>
                        <div style={{ color: "red" }}>
                            {tableerror ? "*Please enter the table number!" : ""}
                        </div>
                    </div>
                </div>
            </Form>
        </div >
    )
}

export default Add