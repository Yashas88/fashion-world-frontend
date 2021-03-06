import React , {useEffect} from 'react'
import { listProducts } from '../actions/productActions' 
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from "react-bootstrap"
import Product from '../components/Product.js'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from "../components/Paginate";


const HomeScreen = ({match}) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error,page , pages,products} = productList

  useEffect(()=> {
    dispatch(listProducts(keyword, pageNumber))
},[dispatch, keyword , pageNumber])

  return (
    <>
       <h1>Latest Products</h1> 
       {loading ? <Loader /> : error ? <Message varient='danger' >{error}</Message> : 
       <>
            <Row>
            {products.map(product => (
                <Col key = {product._id} sm = {12} md = {6} xl = {3}>
                       <Product product = {product}/>
                </Col>
            ))}
        </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        
        </>
        }     
    </>
  )
}

export default HomeScreen