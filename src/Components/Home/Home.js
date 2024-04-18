import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCustomerdata, getCustomerdata } from '../../Reducer/mediaSlice'
import "./Home.css"
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2'
import Badge from 'react-bootstrap/Badge';

const Home = () => {
    const [state, setState] = useState([])
    let [search, setSearch] = useState("")
    const dispatch = useDispatch()

    //get orders
    const getCustomer = (() => {
        dispatch(getCustomerdata())
            .then((res) => {
                // console.log("Get data: ", res.payload);
                setState(res.payload)
            })
            .catch((err) => {
                console.log("Get Error: ", err);
            })
    })

    useEffect(() => {
        getCustomer();
    }, [dispatch])

    // console.log("State: ", state);

    const deleteCustomer = (id) => {
        console.log("ID to be deleted: ", id);
        dispatch(deleteCustomerdata(id))
            .then((res) => {
                getCustomer();
            })
            .catch((err) => console.log("Error: ", err))
    }

    const filterData = state.filter((prod) => {
        if (search === "") {
            return true;
        }
        // return prod.name.toLowerCase().includes(search.toLowerCase());
        else if (prod.name.toLowerCase().includes(search.toLowerCase())) {
            // console.log("prodName: ", prod.name);
            return true;
        }
        else {
            return false;
        }
    })



    return (
        <div className="home_main_div">
            <div className="home_main_div_2">
                <div className="home_main_div_2_top">

                    <Link to={`/add`} style={{ textDecoration: "none", color: "white" }}>
                        <Button variant="success" style={{ width: "100px" }}>Add
                        </Button>
                    </Link>
                </div>
                <hr />
                <div className="home_main_div_2_bottom">
                    <div className='all_order_box_top'>
                        <div>
                            All Orders
                        </div>
                        <div>
                            <input type="text" placeholder='Search' onChange={(event) => { setSearch(event.target.value) }} />
                        </div>
                    </div>
                    <div className='all_order_box_bottom'>
                        {
                            filterData.map((prod, index) => (
                                <ListGroup key={prod.id} className='home_order_list'>
                                    <ListGroup.Item className='home_order_list_font'>{index}: Name: {prod.name}, Room No: {prod.room_number}<br />
                                        <b>Category: </b>{prod.category}, <b>Status: </b>{prod.status === "Paid" ? (<Badge bg="success">{prod.status}</Badge>) : (<Badge bg="danger">{prod.status}</Badge>)}
                                    </ListGroup.Item>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                {/* <BsThreeDotsVertical /> */}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href={`/edit/${prod.id}`}>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2" style={{ color: "red" }}
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "Are you sure?",
                                                            text: "You won't be able to revert this!",
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonColor: "#3085d6",
                                                            cancelButtonColor: "#d33",
                                                            confirmButtonText: "Yes, delete it!"
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                Swal.fire({
                                                                    title: "Deleted!",
                                                                    text: "Your file has been deleted.",
                                                                    icon: "success"
                                                                });
                                                                deleteCustomer(prod.id);
                                                            }
                                                        });
                                                    }}
                                                >Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </ListGroup>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home