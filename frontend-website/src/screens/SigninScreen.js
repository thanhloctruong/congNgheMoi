import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin, signinGoogle, signinFacebook } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import { GoogleLogin } from "react-google-login";
import { FacebookLoginWithButton } from "facebook-login-react";
import MessageBox from "../components/MessageBox";
function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);
  const googleSuccess = async (res) => {
    const name = res.profileObj.name ? res.profileObj.name : 1;
    const name1 = res.profileObj.email ? res.profileObj.email : 1;
    // console.log(name1);
    // const token = res.tokenId?res.tokenId:1;
    dispatch(signinGoogle(name, name1));
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  const responseFacebook = (response) => {
    console.log(response);
    const nameFace = response.name;
    const emailFace = response.email;
    dispatch(signinFacebook(nameFace, emailFace));
    // setData(response);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1> Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            id="email"
            placeholder=" enter ur email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="inter ur password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            {" "}
            Sign In
          </button>
        </div>
        <div>
          <GoogleLogin
            clientId="243963154490-84pmn0tsofddtv1ibo2dh79fkodjfgp7.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onfailure={googleFailure}
            cookiePolicy="single_host_origin"
          ></GoogleLogin>
        </div>
        <div>
          <FacebookLoginWithButton
            appId="973667153209941"
            // autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
          ></FacebookLoginWithButton>
        </div>
        <div>
          <label />
          <div>
            create account?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              {" "}
              Create ur account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
