import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import  Axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    let [user,setUser] = useState({});

    let changeInput = (e) =>{
        let {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    let submitData = async (e) =>{
        e.preventDefault();
        console.log(user);

        let checkUser = await Axios.get("http://localhost:3000/users?email="+user.email);
        if(checkUser.data.length===0){
            if(user.password == user.cpass){
                let registerUser = await Axios.post("http://localhost:3000/users",user);
                if(registerUser){
                        toast.success("User registerd Successfully");
                }
                else{
                    toast.error("User not registerd");
                }
            }
            else{
                toast.error("Password & Confirm password not match")
            }
        }
        else{
            // console.log("User is already registerd !! try new Email id");
            toast.error("User is already registerd !! try new Email id");
        }
    }
    return(
        <>
            <Container>

                <Row className="justify-content-md-center">
                    <Col md="4">
                    <h1>SignUp Page</h1>
                        <Form method="post" onSubmit={(e)=>submitData(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username"  onChange={(e)=>changeInput(e)} placeholder="enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" onChange={(e)=>changeInput(e)} placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"  onChange={(e)=>changeInput(e)} name="password"placeholder="Enter password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"  onChange={(e)=>changeInput(e)} name="cpass"  placeholder="Enter confirm password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                             <Button type="submit" value="SignUp">SignUp</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                   
                </Row>
               
            </Container>
            <ToastContainer />
           
        </>
    )
}


export default SignUp;