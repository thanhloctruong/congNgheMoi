import React from 'react';
import Rating from './Rating';
function Products(props) {
    const {product} = props;
    return (
        <div key={product._id} class="card">
            <a href={`/product/${product._id}`}>
                <img src={product.img} alt={product.name} />
            </a>
            <div class="card-body">
                <a href={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </a>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <div class="price">${product.price}</div>
            </div>

        </div>
    );
}

export default Products;