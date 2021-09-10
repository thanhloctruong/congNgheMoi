import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippiingAddress } from "../actions/cartActions";

function ShippingAddressScreen(props) {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      saveShippiingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1> Shipping address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="your full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">address</label>
          <input
            type="text"
            id="address"
            placeholder="your address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">city</label>
          <input
            type="text"
            id="city"
            placeholder="your city"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">postalCode</label>
          <input
            type="text"
            id="postalCode"
            placeholder="postalcode"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">country</label>
          <input
            type="text"
            id="country"
            placeholder="country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
