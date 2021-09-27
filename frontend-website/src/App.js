import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import AdminRoute from './components/AdminRoute';
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userAction";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "components/PrivateRoute";

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  // console.log(userSignin);
  const { userInfo } = userSignin;
  // console.log(userInfo.result.name);
  // const userSigninGoogle = useSelector(state => state.userSigninGoogle);
  // const {userInfoGoogle} = userSigninGoogle;
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
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
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
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  {" "}
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">productlist</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">order</Link>
                  </li>
                  <li>
                    <Link to="/userlist">users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/products/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">coppy right ACan @2021</footer>
      </div>
    </Router>
  );
}

export default App;
