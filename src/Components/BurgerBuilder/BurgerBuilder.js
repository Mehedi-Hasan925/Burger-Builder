import React, { Component } from 'react'
import Burger from './Burger/Burger'
import OrderModal from './Burger/orderModal'
import Checkout from './Checkout/checkout'
import {Route,Switch,Redirect} from 'react-router-dom';

export default class BurgerBuilder extends Component {
    state={
        ingredients:[
            {type:"bread-salad",amount:0,price:20},
            {type:"bread-meat",amount:0,price:40},
            {type:"bread-cheese",amount:0,price:30},
        ],
        totalPrice:70,
        modalShow:false,
        purchaseable:false
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
        let Price = this.state.totalPrice;
       let ingradients = [...this.state.ingredients]
       for(let item of ingradients){
           if(item.type===type){
               item.amount++
               Price = this.state.totalPrice + item.price
           }
       }
       this.setState({
           ingradients:ingradients,
           totalPrice:Price
       })
       this.updatePurchaseable(this.state.ingredients)
    }

    removeIngredientHandle=(type)=>{
        let Price = this.state.totalPrice;
        let ingradients = [...this.state.ingredients]
       for(let item of ingradients){
           if(item.type===type && item.amount!==0){
               item.amount--
               Price = this.state.totalPrice - item.price
           }
       }
       this.setState({
           ingradients:ingradients,
           totalPrice:Price
       })
       this.updatePurchaseable(this.state.ingredients)
    }

    updatePurchaseable=(ingredients)=>{
        let sum = 0;
        for(let item of ingredients){
            sum=sum + item.amount
        }
        this.setState({
            purchaseable:sum>0,
            checkoutable:sum>0
        })
    }

    render() {
        return (
            <div className="container">
                <OrderModal show={this.state.modalShow} onHide={this.hideModal} price={this.state.totalPrice} summary={this.state.ingredients}  />
                <Switch>
                    <Route path="/home" exact render={()=><Burger ingredients={this.state.ingredients} addIngredientHandle={this.addIngredientHandle} removeIngredientHandle={this.removeIngredientHandle} totalPrice={this.state.totalPrice} modalShow={this.showModal} purchaseable={this.state.purchaseable} />} />
                    <Route path="/checkout" exact render={()=><Checkout totalPrice={this.state.totalPrice} summary={this.state.ingredients} checkoutable={this.state.checkoutable} />} />
                    <Redirect from="/home" to="/" />
                </Switch>
            </div>
        )
    }
}
