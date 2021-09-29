import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { useDispatch, useSelector } from "react-redux";
import { signinQr } from "actions/userAction";
import { USER_SIGNINQR_RESET } from "constants/userConstants";

function SigninQR(props) {
  const [result, setResult] = useState("");
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const handleScan = (data) => {
    if (!data) return;
    setResult(data.text);
    // console.log(result);
  };
  useEffect(() => {
    dispatch(signinQr(result));
  }, [result, dispatch]);
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
      dispatch({ type: USER_SIGNINQR_RESET });
    }
  }, [userInfo, props.history, redirect, dispatch]);
  const handleError = (err) => {
    console.error(err);
  };
  const previewStyle = {
    height: 500,
    width: 500
  };
  return (
    <div className="qrscanner">
      <QrReader
        delay={10000}
        style={previewStyle}
        // accept="image/*"
        // capture="environment"
        onError={handleError}
        onScan={handleScan}
      />

      <button onClick={() => window.location.reload(false)}>Loggin</button>
      {/* <Link to="/">Submit</Link> */}

      {/* <p>{result}</p> */}
    </div>
  );
}

export default SigninQR;
