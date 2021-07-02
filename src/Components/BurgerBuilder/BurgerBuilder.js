import React, { Component } from 'react'
import Burger from './Burger/Burger'

export default class BurgerBuilder extends Component {
    state={
        ingredients:[
            {type:"bread-salad",amount:0},
            {type:"bread-meat",amount:0},
            {type:"bread-cheese",amount:0},
        ]
    }

    addIngredientHandle=(type)=>{
       let ingradients = [...this.state.ingredients]
       for(let item of ingradients){
           if(item.type===type){
               item.amount++
           }
       }
       this.setState({
           ingradients:ingradients
       })
    }

    removeIngredientHandle=(type)=>{
        let ingradients = [...this.state.ingredients]
       for(let item of ingradients){
           if(item.type===type && item.amount!==0){
               item.amount--
           }
       }
       this.setState({
           ingradients:ingradients
       })
    }
    render() {
        return (
            <div className="container">
                <Burger ingredients={this.state.ingredients} addIngredientHandle={this.addIngredientHandle} removeIngredientHandle={this.removeIngredientHandle} />
            </div>
        )
    }
}
