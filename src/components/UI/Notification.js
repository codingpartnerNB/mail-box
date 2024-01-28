import { useEffect, useState } from "react";

const Notification = (props) => {
  const [isErr, setIsErr] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(()=>{
    if (props.status === 'Error') {
      setIsErr(true);
    }
    if (props.status === 'Success') {
      setIsSuccess(true);
    }
  },[props.status]);

  return (
    <section className={`${isErr && 'bg-[#B40505]'} ${isSuccess && 'bg-[#08B108]'} w-screen h-12 bg-[#1a8ed1] flex justify-between py-2 px-[10%] items-center text-white`}>
      <h2 className="text-lg m-0">{props.title}</h2>
      <p className="text-lg m-0">{props.message}</p>
    </section>
  );
};

export default Notification;