import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart, removeCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
// import MessageBox from "../components/MessageBox";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const handleRemoveCart = id => {
    dispatch(removeCart(id));
  };
  const handleCheckOut = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <Row>
        <h1>Shopping cart</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <div>
            <img src="/img/empty-cart.png" alt="empty-cart" className='empty'></img>
            <div>
              <Link to="/">Go Shopping</Link>
            </div>
          </div>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.product}>
                <Row>
                  <Col md={6}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  </Col>
                  <Col md={2}>
                  <select
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={2}>
                  <div>${item.price}</div>
                  </Col>
                  <Col md={2}>
                  <button
                      type="button"
                      onClick={() => handleRemoveCart(item.product)}
                    >
                      DELETE
                    </button>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        )}
      </Col>
      <Col md={4}>
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Tổng Cộng: ({cartItems.reduce((a, c) => a + c.qty, 0)} items): $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={handleCheckOut}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                proceed to chechout
              </button>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
}

export default CartScreen;
