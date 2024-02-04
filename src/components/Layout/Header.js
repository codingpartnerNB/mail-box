import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import login from '../../assets/login.png';
import compose from '../../assets/compose.png';
import home from '../../assets/home.png';
import inbox from '../../assets/inbox.png';
import sent from '../../assets/sent.png';
import logout from '../../assets/logout.png';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const unreadMsg = useSelector(state=>state.mail.unreadMails);
  const totalMsg = useSelector(state=>state.mail.totalMails);
  console.log("Header");

  const sidebarItems = [
    { src: login, label: "Login", show: !isLoggedIn, to: "/", msgCount: '' },
    { src: compose, label: "Compose", show: isLoggedIn, to: "/compose", msgCount: '' },
    { src: home, label: "Home", show: isLoggedIn, to: "/home", msgCount: '' },
    { src: inbox, label: "Inbox", show: isLoggedIn, to: "/inbox", msgCount: `${unreadMsg} (Unread)` },
    { src: sent, label: "Sent", show: isLoggedIn, to: "/sent", msgCount: `${totalMsg} (Total)` },
    { src: logout, label: "Logout", show: isLoggedIn, to: "", msgCount: '' },
  ];

  return (
    <div className="m-1">
      <h1 className="p-2 m-1 flex flex-col items-center text-center rounded-3xl bg-purple-400 w-40 h-24 text-amber-800">
        <span className="text-3xl font-bold m-2">Mail Box</span>
        <div
          onClick={() => setIsVisible(!isVisible)}
          className={`flex flex-col my-1 gap-y-1 w-10 h-7 ${
            isVisible && "rotate-90"
          } items-center justify-center cursor-pointer transition-all duration-300`}
        >
          <div className="w-6 h-1 bg-black rounded-sm"></div>
          <div className="w-6 h-1 bg-black rounded-sm"></div>
          <div className="w-6 h-1 bg-black rounded-sm"></div>
        </div>
      </h1>
      <div
        className={`bg-purple-300 relative m-2 rounded-xl h-auto ${
          isVisible ? "w-64" : "w-20"
        } transition-[width] duration-300 ease-in-out`}
      >
        {sidebarItems.map((list, index) => (
          list.show && (
            <NavLink
              key={index}
              to={list.to}
              className="text-amber-900 group text-lg font-bold flex items-center gap-x-4 cursor-pointer p-4 hover:bg-purple-500 rounded-md"
              onClick={()=>{list.label === "Logout" && dispatch(authActions.logout())}}
            >
              <img
                src={list.src}
                alt={list.label}
                className="w-12 pl-1"
              />
              <span
                style={{ transitionDelay: `${index + 2}00ms` }}
                className={`${
                  !isVisible && "opacity-0 translate-x-20 overflow-hidden"
                } whitespace-pre origin-left duration-300`}
              >
                {`${list.label} ${list.msgCount}`}
              </span>
              <span
                className={`${
                  isVisible && "hidden"
                } absolute left-28 bg-white whitespace-pre rounded-md drop-shadow-lg w-0 overflow-hidden px-0 py-0 group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit`}
              >
                {`${list.label} ${list.msgCount}`}
              </span>
            </NavLink>
          )
        ))}
      </div>
    </div>
  );
};

export default Header;
