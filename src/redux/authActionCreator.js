import * as actionTypes from '../redux/actionTypes'
import axios from 'axios'


export const authSuccess = (token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token:token,
            userId:userId
        }
    }
}

export const AuthLoading=(isloading)=>{
    return{
        type:actionTypes.AUTH_LOADING,
        payload:isloading
    }
}

export const auth=(email,password,mode)=>dispatch=>{
    dispatch(AuthLoading(true))
    const authData ={
        email:email,
        password:password,
        returnSecureToken:true
    }
    let authUrl = null;
    const API_KEY = "AIzaSyCuhtKfgU6VVc_to4jEispo8ddFbdUZ_Qc"

    if(mode==="signin"){
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    }
    else{
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
    }

    axios.post(authUrl + API_KEY, authData )
    .then(response=>{
        dispatch(AuthLoading(false))
        if(response.status===200){
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('userId',response.data.localId)
            const expiredTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('expiredTime',expiredTime)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
        }
    })
    .catch(err=>{
        dispatch(AuthLoading(false))
        // console.log(err.response.data.error.message);
        dispatch(authFailed(err.response.data.error.message))
    })
}


export const checkAuth=()=>dispatch=>{
    const token = localStorage.getItem('token')
    if(!token){
        //logout
        dispatch(logout());
    }
    else{
        const expiredTime = new Date(localStorage.getItem('expiredTime'))
        if(expiredTime<=new Date()){
            //logout
            dispatch(logout());
        }
        else{
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token,userId));
        }
    }
    
}

export const authFailed=(message)=>{
    return{
        type:actionTypes.AUTH_FAILED,
        payload:message,
    }

}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiredTime');
    return{
        type:actionTypes.LOG_OUT
    }
}