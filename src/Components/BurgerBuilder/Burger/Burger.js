import { Button } from 'react-bootstrap';
import React from 'react'
import Ingredient from '../Ingredient/Ingredient';
import ControlsIngredient from './controlsIngredient';




const Burger=(props)=>{
    let ingredientArr = props.ingredients.map((item)=>{
        let ingredientAmount=[...Array(item.amount).keys()]
        // console.log(ingredientAmount);
        return ingredientAmount.map(_=>{
            return <Ingredient type={item.type} key={Math.random()} />
        })
    }).reduce((arr,element)=>{
        return arr.concat(element)
    },[])

    if(ingredientArr.length===0){
        ingredientArr = <p className="text-center"> Please add some ingradients! </p>
    }
    return (
        <div className="row">
            <div className="col-md-8" style={{marginTop:"25px"}}>
            <Ingredient type="bread-top" />
            {ingredientArr}
            <Ingredient type="bread-bottom" />
            </div>
            <div className="col-md-4">
                <ControlsIngredient totalPrice={props.totalPrice} addIngredientHandle={props.addIngredientHandle} removeIngredientHandle={props.removeIngredientHandle} />
                <div className="">
                    <Button disabled={!props.purchaseable} style={{width:"100%",marginTop:"5px",background:"#D70F64"}} onClick={props.modalShow}>ORDER NOW</Button>
                </div>
            </div>
        </div>
    )
}
export default Burger;

