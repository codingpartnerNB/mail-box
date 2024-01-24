import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cPasswordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const switchAuthModeHandler = ()=>{
    setIsLogin(prevState => !prevState);
  }

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if(!isLogin){
      const enteredCPassword = cPasswordInputRef.current.value;
      if (enteredPassword !== enteredCPassword) {
        alert("Password and confirm password should be matched!");
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
        throw new Error("Something went wrong!");
      }
      if(isLogin){
        console.log("User has successfully logged in!");
        localStorage.setItem("email",data.email);
        localStorage.setItem("token",data.idToken);
        navigate('/home');
      }else{
        console.log("User has successfully signed up!");
        setIsLogin(true);
      }
      console.log(data);
    } catch (error) {
      alert("Email or password should correct!");
      console.log(error.message);
    }
  };

  return (
    <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-12 w-3/5 m-auto shadow-md shadow-amber-900">
      <h1 className="text-center my-6 text-purple-900 text-3xl font-bold">
        {isLogin ? "Log In" : "Sign Up"}
      </h1>
      <form
        onSubmit={submitFormHandler}
        className="flex flex-col w-3/4 m-auto my-5"
      >
        <input
          type="email"
          placeholder="Email"
          ref={emailInputRef}
          className="bg-purple-300 border-2 border-purple-300 rounded-lg p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800"
          required
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordInputRef}
          className="bg-purple-300 border-2 border-purple-300 rounded-lg p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800"
          required
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            ref={cPasswordInputRef}
            className="bg-purple-300 border-2 border-purple-300 rounded-lg my-2 p-1 focus:outline-none focus:border-2 focus:border-amber-800"
            required
          />
        )}
        {!isLoading && <button
          type="submit"
          className="bg-amber-700 text-white p-1.5 my-3 rounded-lg text-bold hover:bg-amber-900"
        >
          {isLogin ? "Login" : "Signup"}
        </button>}
        {isLoading && <p className="text-center">Sending request...</p>}
        {isLogin && <Link to="/forgot" className="text-center text-red-600">Forgot Password</Link>}
        <span onClick={switchAuthModeHandler} className="my-2 text-center cursor-pointer text-red-600 font-bold">
          {isLogin ? "Don't have an account? Signup" : "Have an account? Login"}
        </span>
      </form>
    </section>
  );
};

export default Signup;
