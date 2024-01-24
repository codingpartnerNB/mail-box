import React, { useRef, useState } from "react";

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cPasswordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredCPassword = cPasswordInputRef.current.value;
    if (enteredPassword !== enteredCPassword) {
      alert("Password and confirm password should be matched!");
      return;
    }
    setIsLoading(true);
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6UIYeH2c-_Ookju1wRgl-qsb894RvMEI";
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
      console.log(data);
      console.log("User has successfully signed up!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-12 w-3/5 m-auto shadow-md shadow-amber-900">
      <h1 className="text-center my-6 text-purple-900 text-3xl font-bold">
        Sign Up
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
        <input
          type="password"
          placeholder="Confirm Password"
          ref={cPasswordInputRef}
          className="bg-purple-300 border-2 border-purple-300 rounded-lg my-2 p-1 focus:outline-none focus:border-2 focus:border-amber-800"
          required
        />
        {!isLoading && <button
          type="submit"
          className="bg-amber-700 text-white p-1.5 my-3 rounded-lg text-bold hover:bg-amber-900"
        >
          Signup
        </button>}
        {isLoading && <p>Sending request...</p>}
        <span className="mb-2 text-center cursor-pointer text-red-600 font-bold">
          Have an account? Login
        </span>
      </form>
    </section>
  );
};

export default Signup;
