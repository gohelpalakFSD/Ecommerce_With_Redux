import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCartData } from './Redux/Actions/CartAction';
import Axios from 'axios'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { AiTwotonePlusCircle, AiTwotoneMinusCircle  } from "react-icons/ai";
function Cart(){

    let [cartProductData, setCartProductData] = useState([]);
    let [totalBill, setTotalBill] = useState(0);
    let dispatch = useDispatch();
    useEffect( ()=>{
        setTimeout(()=>{
              getUserCartData();
        },1000)
    },[])

    let getUserCartData = async () =>{
        let userLocal = JSON.parse(localStorage.getItem('user'));
        console.log(userLocal)
        if(userLocal==null){
            window.location ="/";
        }

        let cartData = await Axios.get("http://localhost:3000/cartData?userId="+userLocal.id);
        console.log(cartData.data);
        var newArray =[];
        cartData.data.map((v,i)=>{
            newArray.push(v.productId);
        })
       
        

        let allCartProductData =  newArray.map((id)=>Axios.get('https://fakestoreapi.com/products/'+id));

        let response = await Promise.all(allCartProductData);
        
        let result = response.map((res)=>res.data);
        // console.log(result)

        var billTotal = 0;
        result.map((v,i)=>{
            v.cartQuantity = cartData.data[i].quantity,
            v.cartId = cartData.data[i].id

            billTotal += parseFloat(v.cartQuantity)*parseFloat(v.price);
        })

        setTotalBill(billTotal);
        setCartProductData(result)
    }

    let removeCartItem = async (cartId) =>{
        // console.log(cartId)
        let removeCart = await Axios.delete("http://localhost:3000/cartData/"+cartId)
        if(removeCart.data){
            getUserCartData();
            let userLocal = JSON.parse(localStorage.getItem('user'));
            dispatch(getCartData(userLocal.id));
            toast.success("Item removed from cart");
        }
        else{
            toast.error("Item not removed from cart");
        }

    }

    let IncrementQuantity = async (cartId, CQuntity) =>{
        console.log(cartId, CQuntity);

        let updateCart = await Axios.patch("http://localhost:3000/cartData/"+cartId,{
            quantity : CQuntity<5?CQuntity:5
        });
        if(updateCart.data){
            getUserCartData();
            toast.success("Cart Item Updated");
        }
        else{
            toast.error("Something wrong");
        }
    }

    let DecrementQuantity = async (cartId, CQuntity) =>{
        console.log(cartId, CQuntity);

        let updateCart = await Axios.patch("http://localhost:3000/cartData/"+cartId,{
            quantity : CQuntity>0?CQuntity:1
        });
        if(updateCart.data){
            getUserCartData();
            toast.success("Cart Item Updated");
        }
        else{
            toast.error("Something wrong");
        }
    }
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <h3 style={{textAlign:"center",marginTop:"50px"}}>Cart Data</h3>
                   
                    <Col md="auto">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProductData.map((v,i)=>{
                                    return(
                                        <tr>
                                            <td>{++i}</td>
                                            <td><img src={v.image} height="100" /></td>
                                            <td>{v.title}</td>
                                            <td>{v.price}</td>
                                            <td>
                                                <AiTwotoneMinusCircle onClick={()=>DecrementQuantity(v.cartId, --v.cartQuantity)}/>
                                                    {v.cartQuantity} 
                                                <AiTwotonePlusCircle onClick={()=>IncrementQuantity(v.cartId, ++v.cartQuantity)}/>
                                            </td>
                                            <td>{v.price*v.cartQuantity}</td>
                                            <td> <Button variant="danger" onClick={()=>removeCartItem(v.cartId)}>X</Button></td>
                                        </tr>
                                    )
                                })}
                            
                            </tbody>

                            <tr>
                                    <td colSpan={5} style={{textAlign:"right"}}>Total:</td>
                                    <td colSpan={2}>{totalBill}</td>
                                    
                                </tr>
                        </Table>
                    </Col>
                   
                </Row>
            </Container>
        </>
    )
}

export default Cart;