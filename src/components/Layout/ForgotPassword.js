import { useEffect, useRef, useState } from "react";
import emailImg from '../../assets/email.png';

const ForgotPassword = ()=>{
    const emailInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({isError: false, errorMessage: ""});

    useEffect(()=>{
        if(error.isError){
            const timer = setTimeout(()=>{
                setError({isError: false, errorMessage: ""})
            },2000);
            return()=>clearTimeout(timer);
        }
    },[error.isError]);

    const submitHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB6UIYeH2c-_Ookju1wRgl-qsb894RvMEI";
        try{
            setIsLoading(true);
            const res = await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                  requestType: "PASSWORD_RESET",
                  email: enteredEmail
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              });
              setIsLoading(false);
              const data = await res.json();
              console.log(data);
              if(!res.ok){
                throw new Error('Failed to send reset password link!');
              }
        }catch(error){
            setError({isError: true, errorMessage: error.message});
            console.log(error);
        }
    }

    return(
        <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-24 py-10 w-3/5 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
            <h1 className="text-center my-6 text-purple-900 text-3xl font-bold">Forgot Password</h1>
            <form onSubmit={submitHandler} className="flex flex-col w-3/4 m-auto my-5">
                {error.isError && <p className="text-red-600 font-bold">{error.errorMessage}</p>}
                <div className="relative">
                    <img src={emailImg} alt="Email" className="w-4 absolute left-2 transform translate-y-5 cursor-text" />
                    <input type="email" id="email" ref={emailInputRef} placeholder="Email" className="bg-purple-300 w-full border-2 border-purple-300 rounded-lg pl-7 p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800" required />
                </div>
                {!isLoading && <button type="submit" className="bg-amber-700 text-white p-1.5 my-3 rounded-lg text-bold hover:bg-amber-900">Update Password</button>}
                {isLoading && <p className="text-center text-amber-900">Sending request...</p>}
            </form>
        </section>
    );
}

export default ForgotPassword;