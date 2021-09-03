import React, { useState, useEffect } from "react";
import axios from 'axios';
import Products from "../components/Products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function HomeScreen(props) {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [ error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () =>{
        try {
            setLoading(true);
            const {data} = await axios.get('/api/products');
            setLoading(false);
            setProducts(data);    
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
        
    };
    fetchData();
}, []);
  return (
    <div>
    {loading ? <LoadingBox /> 
    :
     error ? <MessageBox variant="danger"> {error} </MessageBox> 
     :
        <div class="row center">
        {products.map(product => (
            <Products key={product._id} product={product} />
        ))}
        </div>
     }
    </div>
     
  );
}

export default HomeScreen;
