import React, { Component } from 'react'
import {Card} from 'react-bootstrap'
import { fetchOrder } from '../../../redux/actionCreator';
import {connect} from 'react-redux'
import Order from './order/order';
import Spinner from '../../Spinner/spinner';


const mapStateToProps=(state)=>{
    return{
        orders:state.orders,
        orderLoading:state.orderLoading,
        orderErr:state.orderErr,
        token:state.token,
        userId:state.userId,

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        fetchOrder:(token,userId)=>dispatch(fetchOrder(token,userId))
    }
}

class Orders extends Component {
    componentDidMount(){
        this.props.fetchOrder(this.props.token,this.props.userId)
    }

    
    render() {
        let order=null
        if(this.props.orderErr){
            return (
                <div className="col-md-10 mx-auto">
                    <Card className="m-5" style={{color:"#5F6368"}}>
                    <Card.Body>
                        <Card.Title>Sorry! Falied to load Orders. Check your internet Connection or Server is not responding now.</Card.Title>
                    </Card.Body>
                    </Card>
                </div>
            )
        }
        else{
            if(this.props.orders.length===0){
                
                   order= <div className="col-md-10 mx-auto">
                                <Card className="m-5" style={{color:"#5F6368"}}>
                                <Card.Body>
                                    <Card.Title>Sorry! No order to show</Card.Title>
                                </Card.Body>
                                </Card>
                            </div>
                
            }
            else{
                order=this.props.orders.map(order=>{
                    return <Order order={order} key={order.id} />
                })
            }
            
            return (
                <div>
                    {this.props.orderLoading?<Spinner />:order}
                </div>
            )
        }
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Orders);
