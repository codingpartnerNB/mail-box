import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cPasswordInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState({isError: false, errorMessage: ""});
  const dispatch = useDispatch();

  const switchAuthModeHandler = ()=>{
    setIsLogin(prevState => !prevState);
  }

  useEffect(()=>{
    if(error.isError){
        const timer = setTimeout(()=>{
            setError({isError: false, errorMessage: ""})
        },2000);
        return()=>clearTimeout(timer);
    }
  },[error.isError]);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if(!isLogin){
      const enteredCPassword = cPasswordInputRef.current.value;
      if (enteredPassword !== enteredCPassword) {
        setError({isError: true, errorMessage: "Password and confirm password should be matched!"});
        return;
      }
    }
    setIsLoading(true);
    let url;
    if(isLogin){
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6UIYeH2c-_Ookju1wRgl-qsb894RvMEI";
    }else{
      url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6UIYeH2c-_Ookju1wRgl-qsb894RvMEI";
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Email or password should be correct!");
      }
      if(isLogin){
        console.log("User has successfully logged in!");
        const idToken = data.idToken;
        const email = data.email;
        dispatch(authActions.login({idToken, email}));
        navigate('/home');
      }else{
        console.log("User has successfully signed up!");
        setIsLogin(true);
      }
      // console.log(data);
    } catch (error) {
      setError({isError: true, errorMessage: error.message});
      console.log(error.message);
    }
  };

  return (
    <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-24 w-3/5 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
      <h1 className="text-center my-6 text-purple-900 text-3xl font-bold">
        {isLogin ? "Log In" : "Sign Up"}
      </h1>
      <form
        onSubmit={submitFormHandler}
        className="flex flex-col w-3/4 m-auto my-5"
      >
        {error.isError && <p className="text-red-600 font-bold">{error.errorMessage}</p>}
        <div className="relative">
          <img src="assets/email.png" alt="Email" className="w-4 absolute left-2 transform translate-y-5 cursor-text" />
          <input
            type="email"
            placeholder="Email"
            ref={emailInputRef}
            className="bg-purple-300 w-full border-2 border-purple-300 rounded-lg pl-7 p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800"
            required
          />
        </div>
        <div className="relative">
          <img src="assets/lock.png" alt="Password" className="w-4 absolute left-2 transform translate-y-5 cursor-text" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            ref={passwordInputRef}
            className="bg-purple-300 w-full border-2 border-purple-300 rounded-lg pl-7 p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800"
            required
          />
          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 border-none bg-none transform translate-y-[-50%] cursor-pointer"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {!isLogin && (
          <div className="relative">
            <img src="assets/lock.png" alt="Confirm Password" className="w-4 absolute left-2 transform translate-y-5 cursor-text" />
            <input
              type={showCPassword ? "text" : "password"}
              placeholder="Confirm Password"
              ref={cPasswordInputRef}
              className="bg-purple-300 w-full border-2 border-purple-300 rounded-lg my-2 pl-7 p-1 focus:outline-none focus:border-2 focus:border-amber-800"
              required
          />
          <button 
            type="button"
            onClick={()=>setShowCPassword(!showCPassword)}
            className="absolute right-2 top-1/2 border-none bg-none transform translate-y-[-50%] cursor-pointer"
          >
            {showCPassword ? '👁️' : '👁️‍🗨️'}
          </button>
          </div>
        )}
        {!isLoading && <button
          type="submit"
          className="bg-amber-700 text-white p-1.5 my-3 rounded-lg text-bold hover:bg-amber-900"
        >
          {isLogin ? "Login" : "Signup"}
        </button>}
        {isLoading && <p className="text-center text-amber-900">Sending request...</p>}
        {isLogin && <Link to="/forgot" className="text-center text-red-600">Forgot Password</Link>}
        <span onClick={switchAuthModeHandler} className="my-2 text-center cursor-pointer text-red-600 font-bold">
          {isLogin ? "Don't have an account? Signup" : "Have an account? Login"}
        </span>
      </form>
    </section>
  );
};

export default Signup;
