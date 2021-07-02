import React from 'react'
import {Card,Button} from 'react-bootstrap'

const ingradientAmount = [
    {label:"salad",type:"bread-salad"},
    {label:"meat",type:"bread-meat"},
    {label:"cheese",type:"bread-cheese"}
]

const BurgerControl = (props)=>{
    return(
        <div className="d-flex" style={{margin:"0px",padding:"0px"}}>
            <div className="mt-2 mb-1"><b>{props.item.label}</b></div>
            <Button className="btn btn-sm btn-success mb-2 mt-2" style={{marginLeft: "auto"}} onClick={()=>props.addIngredientHandle(props.item.type)} >more</Button>
            <Button className="btn btn-sm btn-danger m-2" style={{marginLeft: "auto"}} onClick={()=>props.removeIngredientHandle(props.item.type)}>Less</Button>
        </div>
    );
}

export default function controlsIngredient(props) {
    return (
        <div>
            <Card className="text-center mt-4">
            <Card.Header style={{background:"#0C5498",color:"white"}}>Add Ingredients</Card.Header>
            <Card.Body>
                {
                    ingradientAmount.map((item)=>{
                       return <BurgerControl item={item} addIngredientHandle={props.addIngredientHandle} removeIngredientHandle={props.removeIngredientHandle} key={Math.random()} />
                    })
                }
               
            </Card.Body>
            <Card.Footer>Price: BDT</Card.Footer>
            </Card>
        </div>
    )
}
