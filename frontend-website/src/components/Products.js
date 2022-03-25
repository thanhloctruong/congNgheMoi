import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import {  Card } from 'react-bootstrap';
function Products(props) {
  const { product } = props;
  return (
    <>
      <Card>
        <Link to={`/products/${product._id}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <div className="price">${product.price}</div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
}

export default Products;
