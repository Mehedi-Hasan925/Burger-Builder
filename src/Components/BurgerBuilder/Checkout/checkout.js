import React, { Component } from 'react'
import {Card,Form,Button,Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../Spinner/spinner'
import {RESET_INGREDIENTS} from '../../../redux/actionCreator'
import { connect } from 'react-redux'



const mapStateToProps=(state)=>{
    return {
        userId:state.userId,
        token:state.token,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        RESET_INGREDIENTS:()=>dispatch(RESET_INGREDIENTS()),
    }

}

class checkout extends Component {
    constructor(props){
        super(props)
        this.state={
            isloading:false,
            modalShow:false,
            modalMessage:""
        }
    }

    handleModalClose=()=>{
        this.setState({
            modalShow:false
        })
    }

    handleCheckoutForm=(event)=>{
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
            orderTime: new Date(),
            userId:this.props.userId
        }
        

        axios.post("https://burger-builder-mehedi-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth="+this.props.token,order)
        .then(response=>{
            if(response.status===200){
                this.setState({
                    isloading:false,
                    modalShow:true,
                    modalMessage:"Order Placed Successfully!!"
                })
                this.props.RESET_INGREDIENTS()
            }else{
                this.setState({
                    isloading:false,
                    modalShow:true,
                    modalMessage:"Oh! snap! Something wrong. Try again to place order"
                })
            }
        })
        .catch(err=>{
            this.setState({
                isloading:false,
                modalShow:true,
                modalMessage:err.message
            })
        })
        
    }

    render(){
        if(this.state.isloading){
            return(
                <div className="">
                    <Spinner />
                </div>
            )
        }else{
            return (
                <div className="">
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
                            <Form onSubmit={this.handleCheckoutForm}>
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
                                <Button disabled={!this.props.checkoutable} type="submit" className="btn btn-lg" style={{background:"#D70F64"}}>
                                    Place Order
                                </Button>
                                <Link to={"/home"}><Button variant="secondary" size="lg" style={{marginLeft:"20px"}}>Cancel</Button></Link>
                                </div>
                            </Form>
                        </div>
                        <div className="row mt-4">
            
                        </div>
                    </div>
                    <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
                        
                        <Modal.Body style={{color:"#D70F64"}}><b>{this.state.modalMessage}</b></Modal.Body>
                        <Modal.Footer>
                        
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (checkout);
