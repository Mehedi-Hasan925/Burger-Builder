import * as actionTypes from './actionTypes'

const initalState={
    ingredients:[
        {type:"bread-salad",amount:0,price:20},
        {type:"bread-meat",amount:0,price:40},
        {type:"bread-cheese",amount:0,price:30},
    ],
    totalPrice:70,
    purchaseable:false
}

export const Reducer=(state=initalState,action)=>{
    let Price = state.totalPrice;
    let ingredients = [...state.ingredients]
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for(let item of ingredients){
                if(item.type===action.payload){
                    item.amount++
                    Price = state.totalPrice + item.price
                }
            }
            return{
                ...state,
                ingredients:ingredients,
                totalPrice:Price
            }

        case actionTypes.REMOVE_INGREDIENT:
            for(let item of ingredients){
                if(item.type===action.payload && item.amount!==0){
                    item.amount--
                    Price = state.totalPrice - item.price
                }
            }
            return{
                ...state,
                ingredients:ingredients,
                totalPrice:Price
            }

        case actionTypes.UPDATE_PURCHASEABLE:
            let sum = 0;
            for(let item of state.ingredients){
                sum=sum + item.amount
            }
            
            return{
                ...state,
                purchaseable:sum>0
            }
            
            
        default:
            return state
            
    }

}
