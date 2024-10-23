import { Link, useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import Axios  from "axios";
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { Addtocart } from "./Redux/Actions/CartAction";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductDetails(){

    let pro = useParams();
    let [singleProduct, setSingleProduct] = useState({});
    let userLogin = useSelector((state)=>state.UserReducers.logindetails);
    

    
    let dispatch = useDispatch();

    useEffect(()=>{
        setTimeout(()=>{
            getSingleProduct();
        },500)
    },[])

    let getSingleProduct =() =>{
        // console.log(pro.id);
        Axios.get("https://fakestoreapi.com/products/"+pro.id)
        .then((res)=>{
            setSingleProduct(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let addtoCartSystem = async (e) =>{
        e.preventDefault();
     
        let cartDetails = {
            quantity : e.target.quantity.value,
            productId : pro.id,
            userId : userLogin.id
        }
        let checkCartData = await  Axios.get(`http://localhost:3000/cartData?productId=${pro.id}&userId=${userLogin.id}`);
      
        
        if(checkCartData.data.length==0){
            dispatch(Addtocart(cartDetails))
        }
        else{
            toast.error("Product already into cart!!");
        }
    }

    return(

        <>
            <Container style={{marginTop : "100px"}}>
                <Row>
                    <Col>
                         <img src={singleProduct.image} style={{borderRadius:"5px",padding:"15px"}} height={600} width={150}/>  
                    </Col>
                    <Col style={{marginTop : "100px"}}>
                        <h3>{singleProduct.title}</h3>

                        <Badge bg="primary">{singleProduct.rating?singleProduct.rating.rate:""}</Badge>
                        <h4>{singleProduct.price}</h4>
                        {singleProduct.rating?singleProduct.rating.count > 1 ?
                            <p style={{color:"green"}}>Available</p>
                            :
                            <p style={{color:"red"}}>Out of Stock</p>
                            :""}
                            <p>{singleProduct.description}</p>

                            <form method="post" onSubmit={(e)=>addtoCartSystem(e)}>
                            <Form.Select style={{width:"200px"}} name="quantity">
                               
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option value="5">Five</option>
                            </Form.Select>

                            {userLogin.username?
                            <Button type="submit" name="addtocart" variant="primary" style={{marginTop :"10px"}}>Add to Cart</Button>
                            :
                            <Link to="/signIn"><Button variant="primary" style={{marginTop :"10px"}}>Add to Cart </Button></Link>
                            }

                            </form>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </>
    )
}

export default ProductDetails;