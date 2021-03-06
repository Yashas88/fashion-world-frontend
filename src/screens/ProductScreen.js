import React, { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

// import products from '../products'
// import axios from 'axios'

const ProductScreen = ({ history ,match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch();


  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
   
    dispatch(listProductDetails(match.params.id));
   

  }, [dispatch, match]);

  const addToCartHandler = () => {
     history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link to="/" className="btn btn-dark my-3" >
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup varient="flash">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price : ₹{product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description : ₹{product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup varient="flash">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>₹{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Product Status:</Col>
                    <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {
                      product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col style={{fontSize :'3rem' }}>Qty</Col>
                            <Col>
                              <Form.Control as='select' style={{fontSize :'1.5rem' }} value={qty} onChange={(e)=> setQty(e.target.value)}>
                            { [...Array(product.countInStock).keys()].map((x) =>(
                                <option key={x+1} value={x+1} >{x+1}</option>
                              ))
                            }
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item> 
                      )
                    }

                <ListGroup.Item>
                  <Button 
                  onClick = {addToCartHandler}
                  className="btn-block" type="button" disabled = {product.countInStock === 0}>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};


export default ProductScreen;
