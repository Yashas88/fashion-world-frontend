import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../CSS/searchbox.css';

const Searchbox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className='searchbox'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products....'
        className='searchbox1'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        {' '}
        Search{' '}
      </Button>
    </Form>
  );
};

export default Searchbox;
