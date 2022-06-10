import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import '../CSS/footer.css';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Col className='text-center py-3'>Copyright &copy; Fashion World</Col>
      </Container>
    </footer>
  );
};

export default Footer;
