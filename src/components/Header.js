import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Searchbox from './SearchBox';
import { logout } from '../actions/userActions';
import '../CSS/searchbox.css';

import { profile } from "../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  
  return (
    <header>
      <Navbar
        bg='dark'
        variant='dark'
        collapseOnSelect
        expand='lg'
        className='primary'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Fashion World</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <Searchbox history={history} />} />
            <Nav
              className='mr-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href='#action1' disabled></Nav.Link>
              <Nav.Link href='#action2' disabled></Nav.Link>
              <Nav.Link href='#' disabled></Nav.Link>
            </Nav>
            <Nav className='navbar_header'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  {' '}
                  <i className='fas fa-shopping-cart'></i>
                  Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user'></i>
                    Log in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
