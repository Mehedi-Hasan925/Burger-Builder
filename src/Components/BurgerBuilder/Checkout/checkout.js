import React, { Component } from 'react'
import {Card,Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../Spinner/spinner'


class checkout extends Component {
    constructor(props){
        super(props)
        this.state={
            isloading:false,
        }
    }

    handleCommentForm=(event)=>{
        this.setState({
            isloading:true
        })
        event.preventDefault();
        const mobile=event.target.mobile.value;
        const address=event.target.address.value;
        const payment=event.target.payment.value;

        const order={
            ingredients:this.props.summary,
            paymentDetails:{
                    mobile:mobile,
                    address:address,
                    paymentType:payment
                },
            totalPrice:this.props.totalPrice,
            orderTime: new Date()
        }
        
        console.log(order);

        axios.post("https://burger-builder-mehedi-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",order)
        .then(response=>{
            if(response.status===200){
                this.setState({
                    isloading:false
                })
            }else{
                this.setState({
                    isloading:false
                })
            }
        })
        .catch(err=>{
            this.setState({
                isloading:false
            })
        })
        
    }

    render(){
    if(this.props.checkoutable){
        if(this.state.isloading){
            return(
                <div className="">
                    <Spinner />
                </div>
            )
        }else{
            return (
                <div className="row">
                    <div className="col-md-3 mt-5 mx-auto" style={{}}>
                        <Card className="text-center mt-5">
                            <Card.Header style={{background:"#0C5498",color:"white"}}>Order Summary</Card.Header>
                            <Card.Body>
                            {
                                this.props.summary.map((item)=>{
                                    return(
                                        <div className="">
                                            <span>{item.type}: {item.amount}</span>
                                        </div>
                                    )
                                })
                            }
                            
                            </Card.Body>
                            <Card.Footer><b style={{color:"#D70F64"}}>Payment: BDT.{this.props.totalPrice}/-</b></Card.Footer>
                        </Card>
                    </div>
                    <div className="col-md-8 mt-4 p-4" style={{border:"2px solid #ECECEC"}}>
                        <p className="text-center" style={{fontSize:"50px",color:"rgb(224, 135, 18)"}}>Checkout Details</p>
                        <Form onSubmit={this.handleCommentForm}>
                            <Form.Group className="mb-4" controlId="formGridEmail" >
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="text" name="mobile" placeholder="Enter Mobile No." required />
                            </Form.Group>
                            
                            <Form.Group className="mb-4" controlId="formGridAddress1">
                                <Form.Label>Delivery Address</Form.Label>
                                <Form.Control name="address" placeholder="Enter Delivery Address" required />
                            </Form.Group>
        
                            <Form.Group className="mb-4">
                                <Form.Label>Payment Type</Form.Label>
                                <Form.Control as="select" name="payment">
                                    <option>Cash On Delivery</option>
                                    <option >Bkash</option>
                                    <option >Nagad</option>
                                    <option >Rocket</option>
                                </Form.Control>
                            </Form.Group>
        
                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="I agree the Term and Condition" required />
                            </Form.Group>
        
                            <div className="text-center">
                            <Button type="submit" className="btn btn-lg" style={{background:"#D70F64"}}>
                                Place Order
                            </Button>
                            <Link to={"/home"}><Button variant="secondary" size="lg" style={{marginLeft:"20px"}}>Cancel</Button></Link>
                            </div>
                        </Form>
                    </div>
                    <div className="row mt-4">
        
                    </div>
                </div>
            )
        }
        
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
}

export default checkout;
