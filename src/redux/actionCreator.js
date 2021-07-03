import * as actionTypes from './actionTypes'

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