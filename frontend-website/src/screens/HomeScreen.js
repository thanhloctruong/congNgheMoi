import React from 'react';
import data from '../data';
import Products from '../components/Products';
function HomeScreen(props) {
    return (
        <div class="row center">
            {
                data.products.map((product) => (
                 <Products key={product._id} product={product}/>
                ))
            }
        </div>
    );
}

export default HomeScreen;