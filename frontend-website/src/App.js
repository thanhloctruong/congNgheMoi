import React, { useEffect, useState } from 'react';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import AdminRoute from "./components/AdminRoute";
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userAction";
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import BillScreen from "./screens/BillScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "components/PrivateRoute";
import SigninQRScreen from "screens/SigninQRScreen";
import AdminOrder from "screens/AdminOrder";
import UserListScreen from "screens/UserListScreen";
import UserEditScreen from "screens/UserEditScreen";
import SearchBox from "components/SearchBox";
import SearchScreen from "screens/SearchScreen";
import DashboardScreen from 'screens/DashboardScreen';
import SupportScreen from 'screens/SupportScreen';
import ChatBox from 'components/ChatBox';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  // console.log(userSignin);
  const { userInfo } = userSignin;
  // console.log(userInfo.result.name);
  // const userSigninGoogle = useSelector(state => state.userSigninGoogle);
  // const {userInfoGoogle} = userSigninGoogle;
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              ACan
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            {userInfo ? (
              ""
            ) : (
              <Link to="/signinqr">
                <span className="cartlogo">
                  <i className="fas fa-qrcode"></i>
                </span>
              </Link>
            )}

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
                    <Link to="/" onClick={handleSignOut}>
                      Sign Outs
                    </Link>
                  </li>
                  <li>
                    <QRCode
                      id="qrcode"
                      value={userInfo.token}
                      size={200}
                      level={"H"}
                      includeMargin={true}
                    />
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
                    <Link to="/productlist/pageNumber/:pageNumber">productlist</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">order</Link>
                  </li>
                  <li>
                    <Link to="/userlist">users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                  <li>
                    <Link to="/adminorder">Thanh Toan</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/signinqr" component={SigninQRScreen}></Route>
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
          <Route path="/bill/:id" component={BillScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
             path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute path="/adminorder" component={AdminOrder}></AdminRoute>
          {/* <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute> */}
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
        {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
        <div>
        coppy right ACan @2021
        </div></footer>
      </div>
    </Router>
  );
}

export default App;
