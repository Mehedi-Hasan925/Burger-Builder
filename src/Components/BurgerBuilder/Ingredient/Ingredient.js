import React from 'react'
import { Image } from 'react-bootstrap';
import './Ingredient.css';
import bottom from '../../../assets/image/bottom.png'
import top from '../../../assets/image/top.png'
import salad from '../../../assets/image/salad.png'
import meat from '../../../assets/image/meat.png'
import cheese from '../../../assets/image/cheese.png'

const Ingredient=(props)=>{
    let ingredient = null;
    switch(props.type){
        case "bread-bottom":
            ingredient = <div className=""><Image src={bottom} /></div>
            break;

        case "bread-top":
            ingredient = <div className="m-0 p-0"><Image src={top} /></div>
            break;
        
        case "bread-salad":
            ingredient = <div className="m-0 p-0"><Image src={salad} /></div>
            break;
        
        case "bread-meat":
            ingredient = <div className="m-0 p-0"><Image src={meat} /></div>
            break;
        
        case "bread-cheese":
            ingredient = <div className="m-0 p-0"><Image src={cheese} /></div>
            break;
        
        default:
            ingredient =null;
            break;
    }
    return (
        <div className="Ingredient ">
            {ingredient}
        </div>
    )
}
export default Ingredient;
