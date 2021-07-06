import React from 'react'
import {Card} from 'react-bootstrap'

export default function order(props) {
    const ingredients = props.order.ingredients.map(item=>{
        return <div key={item.type}>{item.type} : {item.amount}</div>
    })
    return (
        <div className="col-md-8 mx-auto">
            <Card className="m-5" border="dark" style={{color:"#5F6368"}}>
            <Card.Body>
                <Card.Title>Order Id: {props.order.id}</Card.Title>
                <Card.Text>
                    <p>Delivery Address: {props.order.paymentDetails.address}</p>

                    <hr />
                        {ingredients}
                    <hr />
                    <p>Total Price: {props.order.totalPrice}</p>
                </Card.Text>
                
            </Card.Body>
            </Card>
        </div>
    )
}
