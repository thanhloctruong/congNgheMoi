import React, { useState } from 'react';
import { Button, Form, FormControl, Row } from 'react-bootstrap';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
      <Form className="d-flex search" onSubmit={submitHandler}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          name='q'
          id="q"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="outline-success"><i className="fa fa-search"></i></Button>
      </Form>
  );
}