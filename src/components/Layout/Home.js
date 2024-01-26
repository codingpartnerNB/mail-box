import React from "react";

const Home = ()=>{
    return(
        <section className="w-3/4 m-auto my-10">
            <h1 className="text-center font-bold text-3xl text-purple-700">Welcome to your Mail Box</h1>
            <img src="assets/dashbord.jpg" alt="Mailman(Postman) is sending mail." className="lg:w-[55%] sm:w-full my-5 rounded-lg shadow-[0_0_35px_-8px_rgba(0,0,0,0.6)] shadow-amber-900 m-auto" />
        </section>
    );
}

export default Home;