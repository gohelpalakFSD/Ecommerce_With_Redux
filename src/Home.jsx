import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Category from './Category';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FaStar } from "react-icons/fa";
import Product from './Product';




function Home() {

    let [category, setCategory] = useState([]);
    let [product,setProducts] = useState([]);

    useEffect(()=>{
        setTimeout(()=>{
            fetchData();
            productData();
        },1000)
    },setCategory);

    let fetchData = () =>{
        Axios.get("https://fakestoreapi.com/products/categories")
        .then((res)=>{
            console.log(res.data);
            setCategory(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let productData = () =>{
       Axios.get("https://fakestoreapi.com/products")
       .then((res)=>{
          console.log(res.data);
          setProducts(res.data);
       })
       .catch((err)=>{
          console.log(err);
       })
    }

    let categoryWiseProduct = (cat) =>{
        console.log(cat);
        if(cat=='All'){
          productData();
        }
        else{
          Axios.get("https://fakestoreapi.com/products/category/"+cat)
          .then((res)=>{
            console.log(res.data);
            setProducts(res.data);
         })
         .catch((err)=>{
            console.log(err);
         })
        }  
    }
  return (
    <>
       
    
      <Category cat={category}  catproduct={categoryWiseProduct}/>

      <Product pro={product}/>

    </>
  )
}

export default Home
