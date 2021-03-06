import React , {useState , useEffect}from 'react'
import {Form,Button, Row , Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

// from action
import {register} from '../actions/userActions'

const RegisterScreen = ({location , history}) => {
    const dispatch = useDispatch()

    const [name ,setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    //get user register state from store
    const userRegister = useSelector((state)=> state.userRegister)
    const {loading,error ,userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    
    useEffect(()=> {
        if(userInfo) {
            history.push(redirect)
        }
    },[history , userInfo , redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        } else {
        dispatch(register(name , email , password))
        }
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant ='danger' >{message}</Message>}
            {error && <Message variant='danger' >{error}</Message> }
            {loading && <Loader/>}
            <br></br>
            <Form onSubmit ={submitHandler} >
            <Form.Group controlId='name' >
                    <Form.Label> Name </Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' 
                    value ={name}
                    onChange = {(e)=>{setName(e.target.value)}}
                    ></Form.Control>
                </Form.Group>


                <Form.Group controlId='email' >
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' 
                    value ={email}
                    onChange= {(e)=>{setEmail(e.target.value)}}
                  
                    ></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='password' >
                    <Form.Label> Password </Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' 
                    value = {password}
                    onChange = {(e)=>{setPassword(e.target.value)}}
                
                    ></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='password' >
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' 
                    value = {confirmPassword }
                    onChange = {(e)=>{setConfirmPassword(e.target.value)}}
                
                    ></Form.Control>
                </Form.Group>

                <br></br>

                <Button  type='submit' variant='primary'> Register </Button>


            </Form>

            <Row className='py-3' >
                <Col>
              Already have an Account ? <Link to={ redirect ? `/login?redirect=${redirect}` : `/login` }> Login </Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
