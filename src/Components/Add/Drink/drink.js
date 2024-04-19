import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import "./drink.css"

const Drink = () => {
  let { id } = useParams()
  console.log("ID: ", id);

  const drinkItems = [{
    "name": "Appetizers",
    "img": "https://images.unsplash.com/photo-1607098665874-fd193397547b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "name": "Main Course",
    "img": "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "name": "Deserts",
    "img": "https://images.unsplash.com/photo-1567691334394-c0d00a7716db?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "name": "Sushi & Sushana",
    "img": "https://plus.unsplash.com/premium_photo-1668143362936-ce8a84410659?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHwwfDB8fHww"
  }]

  return (
    <div className='drink_page_div'>
      <div className='drink_page_div_2'>
        <label style={{ fontSize: "30px", fontWeight: "700" }}>Drink Menu</label>
        <div>
          {
            drinkItems.map((prod, index) => (
              <React.Fragment key={index}>
                <Card >
                  <Card.Img variant="top" src={prod.img} />
                  <Card.Body>
                    <Card.Title style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: 0, margin: 0 }}>
                      <div>{prod.name}</div>
                      <Button variant="primary">More</Button>
                    </Card.Title>

                  </Card.Body>
                </Card>
                <br />
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </div >
  )
}

export default Drink