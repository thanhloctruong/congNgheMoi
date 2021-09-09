import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              ACan
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <span className='cartlogo'><i className="fas fa-shopping-cart"></i></span>
              {cartItems.length > 0 && (
                <span className ='badge'>{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">sign in</Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/products/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">coppy right ACan @2021</footer>
      </div>
    </Router>
  );
}

export default App;
