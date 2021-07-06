import * as actionTypes from './actionTypes'

const initalState={
    ingredients:[
        {type:"bread-salad",amount:0,price:20},
        {type:"bread-meat",amount:0,price:40},
        {type:"bread-cheese",amount:0,price:30},
    ],
    orders:[],
    orderLoading:true,
    orderErr:false,
    totalPrice:70,
    purchaseable:false,
    

    // authenticaton
    token:null,
    userId:null,
    authLoading:false,
    authFailedMsg:null,
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

        case actionTypes.RESET_INGREDIENTS:
            
            return{
                ...state,
                ingredients:[
                    {type:"bread-salad",amount:0,price:20},
                    {type:"bread-meat",amount:0,price:40},
                    {type:"bread-cheese",amount:0,price:30},
                ],
                totalPrice:70,
                purchaseable:false
            }
            
        
        case actionTypes.ORDER_LOADED:
            let orders=[]
            for(let key in action.payload){
                orders.push(
                    {
                        ...action.payload[key],
                        id:key
                    }
                    )
            }
            return{
                ...state,
                orders:orders,
                orderLoading:false,
            }
        
        case actionTypes.ORDER_LOAD_FAILED:
            return{
                ...state,
                orderErr:true,
                orderLoading:false

            }
        
        // Authentication
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.payload.token,
                userId:action.payload.userId
            }
        

        case actionTypes.LOG_OUT:
            return{
                ...state,
                token:null,
                userId:null,
                authFailedMsg:null,
            }
        

        case actionTypes.AUTH_LOADING:
            // console.log(action.payload)
            return{
                ...state,
                authLoading:action.payload
            }
        

        case actionTypes.AUTH_FAILED:
            console.log(action.payload);
            return{
                ...state,
                authFailedMsg:action.payload
            }

        default:
            return state
            
    }

}
