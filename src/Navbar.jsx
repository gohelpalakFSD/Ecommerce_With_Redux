
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserData, userLogout } from './Redux/Actions/UserActions';
import { getCartData } from './Redux/Actions/CartAction';


function Header(){
    
    let dispatch = useDispatch();
    let userLogin = useSelector((state)=>state.UserReducers.logindetails);
    console.log(userLogin);
    let cartRecord = useSelector((state)=>state.CartReducers.cartRecord)
    
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(getUserData());
           
        })
    },[getUserData])

    useEffect(()=>{
        let userData = JSON.parse(localStorage.getItem('user'));
        if(userData){
            dispatch(getCartData(userData.id))
        }
    },[])
        
   

    let logoutuser = () =>{
        dispatch(userLogout());
        window.location = "/";
    }
    
    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="#home" >Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                     

                     {userLogin.username?
                        userLogin.username
                        :
                        <NavLink to="/signUp" ><Button style={{marginRight:'20px'}}>SignUp</Button></NavLink>
                     }

                     
                   
                    {userLogin.username?
                        <Button onClick={()=>logoutuser()} style={{marginRight:'20px'}}>Logout</Button>
                        :
                        <NavLink to="/signIn"><Button>SignIn</Button></NavLink>
                    
                    }

                    {userLogin.username?
                        <NavLink to="/Cart" ><Button  style={{paddingLeft:'20px'}}>Cart({cartRecord.length})</Button></NavLink>:""
                    }
                     
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;