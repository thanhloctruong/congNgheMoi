import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userAction";

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signout());
  };
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
              <span className="cartlogo">
                <i className="fas fa-shopping-cart"></i>
              </span>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={handleSignOut}>
                      Sign Outs
                    </Link>

                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">sign in</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/products/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">coppy right ACan @2021</footer>
      </div>
    </Router>
  );
}

export default App;
