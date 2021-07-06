import React, { Component } from 'react'
import Burger from './Burger/Burger'
import OrderModal from './Burger/orderModal'
import Checkout from './Checkout/checkout'
import Orders from './orders/Orders'
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {ADD_INGREDIENT,REMOVE_INGREDIENT,UPDATE_PURCHASEABLE} from '../../redux/actionCreator'
import AuthForm from '../Auth/AuthForm'
import LogIn from '../Auth/logIn' 



const mapStateToProps=(state)=>{
    return{
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchaseable:state.purchaseable,
        token:state.token,
        userId:state.userId
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        ADD_INGREDIENT:(igtype)=>dispatch(ADD_INGREDIENT(igtype)),
        REMOVE_INGREDIENT:(igtype)=>dispatch(REMOVE_INGREDIENT(igtype)),
        UPDATE_PURCHASEABLE:()=>dispatch(UPDATE_PURCHASEABLE()),

        }
    }


class BurgerBuilder extends Component {
    state={
        modalShow:false
    }
    

    // totalPrice=(price)=>{
    //     console.log()
    // }
    showModal=()=>{
        this.setState({
            modalShow:true
        })
    }

    hideModal=()=>{
        this.setState({
            modalShow:false
        })
    }


    addIngredientHandle=(type)=>{
        this.props.ADD_INGREDIENT(type)
        this.props.UPDATE_PURCHASEABLE()
    }

    removeIngredientHandle=(type)=>{
        this.props.REMOVE_INGREDIENT(type)
        this.props.UPDATE_PURCHASEABLE()
    }

    render() {
        let routes=null;
        if(this.props.token===null){
            routes=(
                <Switch>
                    <Route path="/login" exact render={()=><LogIn />} />
                    <Route path="/signup" exact render={()=><AuthForm />} />
                    <Redirect to="/signup" />
                </Switch>
            )
        }
        else{
            routes=(
                <Switch>
                    <Route path="/" exact render={()=><Burger ingredients={this.props.ingredients} addIngredientHandle={this.addIngredientHandle} removeIngredientHandle={this.removeIngredientHandle} totalPrice={this.props.totalPrice} modalShow={this.showModal} purchaseable={this.props.purchaseable} key='2'  />} />
                    <Route path="/checkout" exact render={()=><Checkout totalPrice={this.props.totalPrice} summary={this.props.ingredients} checkoutable={this.props.purchaseable} key='1' />} />
                    <Route path="/orders" exact render={()=><Orders />} />
                    {/* <Route path="/logout" exact render={()=><LogOut />} /> */}
                    {/* <Redirect from="/" to="/home" /> */}
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div className="container">
                <OrderModal show={this.state.modalShow} onHide={this.hideModal} price={this.props.totalPrice} summary={this.props.ingredients} key='3'  />
               {routes}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (BurgerBuilder);