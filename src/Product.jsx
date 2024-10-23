
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FaStar } from "react-icons/fa";
import {Link} from 'react-router-dom'

function Product(props){
    return(
        <>
            <Container style={{marginTop:"40px"}}>
      <Row>
        {props.pro.map((v,i)=>{
          return(
            <Col style={{marginBottom:"20px"}}>
              <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={v.image} style={{borderRadius:'15px',padding:"20px"}} height={250} width={100}/>
                <Card.Body>
                  <Card.Title>
                   <Link to={"/productdetails/"+v.id}> {v.title.substring(0,30)}</Link>
                  </Card.Title>
                  <Card.Text>
                    {v.description.substring(0,50)+"..."}
                  </Card.Text>
                   Rating: {v.rating.rate } <br/>
                  <Badge bg="primary">₹{v.price}</Badge><br></br>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
        
      </Row>
      
    </Container>
        </>
    )
}

export default Product;