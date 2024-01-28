const Notification = (props) => {
  const status = props.status;
  return (
    <section className={`${(status === 'Error') ? 'bg-[#B40505]' : 'bg-[#1a8ed1]'} ${(status === 'Success') ? 'bg-[#08B108]' : 'bg-[#1a8ed1]'} w-screen h-12 flex justify-between py-2 px-[10%] items-center text-white`}>
      <h2 className="text-lg m-0">{props.title}</h2>
      <p className="text-lg m-0">{props.message}</p>
    </section>
  );
};

export default Notification;