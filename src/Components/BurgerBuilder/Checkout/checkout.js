import React from 'react'
import {Card,Form,Button,Row,Col} from 'react-bootstrap'

const checkout=(props)=>{
    if(props.checkoutable){
    return (
        <div className="row">
            <div className="col-md-3 mt-5 mx-auto" style={{borderRight:"2px solid green",marginRight:"5px"}}>
                <Card className="text-center mt-5">
                    <Card.Header style={{background:"#0C5498",color:"white"}}>Order Ckeckout</Card.Header>
                    <Card.Body>
                    {
                        props.summary.map((item)=>{
                            return(
                                <div className="">
                                    <span>{item.type}: {item.amount}</span>
                                </div>
                            )
                        })
                    }
                    
                    </Card.Body>
                    <Card.Footer><b>Price: BDT.{props.totalPrice}/-</b></Card.Footer>
                </Card>
            </div>
            <div className="col-md-8 mt-4 p-4" style={{border:"2px solid #ECECEC"}}>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        {/* <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group> */}

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
    }
    else{
        return(
            <div className="row">
                <div className="col-12 text-center" style={{marginTop:"200px"}}>
                    <p><b>Please ORDER something</b></p>
                </div>
            </div>
        )
    }
}
export default checkout; 
