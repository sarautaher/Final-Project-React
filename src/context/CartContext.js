import axios from "axios";
import { createContext, useState } from "react";

export let CartContext=createContext();
export default function CartContextProvider(myprops){
    const[cartNumber ,setcartNumber]=useState(0)
    const [numberOfWish , setNumberOfWish] = useState(null)
    const[cartId ,setcartNumberId]=useState(null)
    let BaseUrl=`https://ecommerce.routemisr.com`;
    let  header={token:localStorage.getItem('userTonken')}
    function addToCart(id){
        try{
        return axios.post(`${BaseUrl}/api/v1/cart`,{productId:id},{
            headers:header
        })}
        catch(error){
            throw error;
        }
        
    }
    function UpdateCart(id ,count){
        try{
        return axios.put(`${BaseUrl}/api/v1/cart/${id}`
        ,{count:count},
        {
            headers:header
        })}
        catch(error){
            throw error;
        }
        
        
    }
    function DeleteCart(id ){
        try{
        return axios.delete(`${BaseUrl}/api/v1/cart/${id}` ,
        {headers:header})
    }
    catch(error){
        throw error;
    }
        
    }
    function getCart(){
        try{
        return axios.get(`${BaseUrl}/api/v1/cart`,{
            headers:header
        })
    }
    catch(error){
        throw error;
    }
        
    }
    function CheckoutPayment(FormDate){
        try{
        return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
        ,{shippingAddress:FormDate},
        {
            headers:header
        })}
        catch(error){
            throw error;
        }
        
    }
    async function cashPayment(shippingAddress) {
        try {
         return await axios.post(
           `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            shippingAddress ,
            {
              headers: { token: localStorage.getItem("userToken") },
            }
          );
    
        } catch (error) {
          throw error;
        }
      }
    
    async function AddWishList(productId) {
        try {
          return  axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId }, 
            {
                headers:header,
            }
          );
        } catch (error) {
          throw error;
        }
      }
    return <CartContext.Provider value={{ addToCart ,cartNumber,cashPayment,setNumberOfWish,numberOfWish,setcartNumber,getCart,DeleteCart,UpdateCart, AddWishList,CheckoutPayment,cartId,setcartNumberId}}>
      {myprops.children}
    </CartContext.Provider>
}