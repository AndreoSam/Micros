import React from 'react'
import "./option.css"
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const Option = () => {
    const { id } = useParams()
    console.log("ID", id);

    return (
        <div className='option_css'>
            <div className='option_css_2'>
                <div>
                    <label style={{ fontSize: "30px", fontWeight: "600" }}>What would you like to have?</label>
                </div>
                <br/>
                <div className="option_buttons">
                    <Button variant='info'>
                        <Link to={`/food/${id}`} style={{ textDecoration: "none", color: 'black' }}>
                            Food
                        </Link>
                    </Button>
                    <Button variant='info'>
                        <Link to={`/drink/${id}`} style={{ textDecoration: "none", color: 'black' }}>
                            Drink
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Option