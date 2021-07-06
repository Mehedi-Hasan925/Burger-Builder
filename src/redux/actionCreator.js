import * as actionTypes from './actionTypes'
import axios from 'axios'

export const ADD_INGREDIENT=(igtype)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        payload:igtype
    }
}

export const REMOVE_INGREDIENT = (igtype)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        payload:igtype
    }

}

export const UPDATE_PURCHASEABLE = ()=>{
    return{
        type:actionTypes.UPDATE_PURCHASEABLE
       
    }

}

export const RESET_INGREDIENTS = ()=>{
    return{
        type:actionTypes.RESET_INGREDIENTS
    }
}

export const orderLoaded =(orders)=>{
    return {
        type:actionTypes.ORDER_LOADED,
        payload:orders
    }
}

export const orderLoadFailed = ()=>{
    return{
        type:actionTypes.ORDER_LOAD_FAILED
    }
}
export const fetchOrder=(token,userId)=>dispatch=>{
    const queryParam = '&orderBy="userId"&equalTo="'+userId+'"'
    axios.get('https://burger-builder-mehedi-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth='+token+queryParam)
    .then(response=>{
        dispatch(orderLoaded(response.data))
    })
    .catch(err=>dispatch(orderLoadFailed()))
}



