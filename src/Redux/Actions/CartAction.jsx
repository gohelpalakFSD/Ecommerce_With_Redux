import { ADD_TO_CART, GET_CART_DATA } from "../ActionTypes";
import Axios from 'axios'

export const Addtocart = (data) => async (dispatch) =>{

    let addtocartProduct=  await Axios.post("http://localhost:3000/cartData",data);

    dispatch({
        type : ADD_TO_CART,
        payload : addtocartProduct
        
    })
}


export const getCartData = (userId) => async (dispatch) =>{
    console.log("fun="+userId)
    let getUserData = await Axios.get("http://localhost:3000/cartData?userId="+userId);
    console.log(getUserData.data)

    dispatch({
        type : GET_CART_DATA,
        payload : getUserData.data
    })

}