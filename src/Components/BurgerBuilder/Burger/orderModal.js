import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const orderModal=(props)=>{
    return (
        <div>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Burger
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <h4>
                        Total Price: {props.price}/-
                    </h4>
                    {
                        props.summary.map((item)=>{
                            return(
                                <div className="">
                                    <span>{item.type}: {item.amount}</span>
                                </div>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                <Link to={"/checkout"}><Button onClick={props.onHide}>continue to Checkout</Button></Link>
                <Button onClick={props.onHide} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default orderModal; 
