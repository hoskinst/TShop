import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/userApiSlice';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passowrds don\'t match');
        }
        try {
            const res = await register({ email, name, password }).unwrap();
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast.error(error.data.message || error.error);
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [ userInfo, redirect, navigate]);

    return(
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2"  disabled={isLoading}>
                    Sign In
                </Button>
                { isLoading && <Loader /> }
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link to={ redirect ? `/register?redirect=${redirect}`: '/register' }></Link>
                </Col>
            </Row>  
        </FormContainer>
    )
}

export default RegisterScreen;