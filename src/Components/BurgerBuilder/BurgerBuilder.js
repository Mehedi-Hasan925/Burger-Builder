import React, { Component } from 'react'
import Burger from './Burger/Burger'
import OrderModal from './Burger/orderModal'
import Checkout from './Checkout/checkout'
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {ADD_INGREDIENT,REMOVE_INGREDIENT,UPDATE_PURCHASEABLE} from '../../redux/actionCreator'


const mapStateToProps=(state)=>{
    return{
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchaseable:state.purchaseable
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        ADD_INGREDIENT:(igtype)=>dispatch(ADD_INGREDIENT(igtype)),
        REMOVE_INGREDIENT:(igtype)=>dispatch(REMOVE_INGREDIENT(igtype)),
        UPDATE_PURCHASEABLE:()=>dispatch(UPDATE_PURCHASEABLE())

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
        return (
            <div className="container">
                <OrderModal show={this.state.modalShow} onHide={this.hideModal} price={this.props.totalPrice} summary={this.props.ingredients}  />
                <Switch>
                    <Route path="/home" exact render={()=><Burger ingredients={this.props.ingredients} addIngredientHandle={this.addIngredientHandle} removeIngredientHandle={this.removeIngredientHandle} totalPrice={this.props.totalPrice} modalShow={this.showModal} purchaseable={this.props.purchaseable} />} />
                    <Route path="/checkout" exact render={()=><Checkout totalPrice={this.props.totalPrice} summary={this.props.ingredients} checkoutable={this.props.purchaseable} />} />
                    <Redirect from="/home" to="/" />
                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (BurgerBuilder);