import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import Notification from "../UI/Notification";

const RootLayout = ()=>{
    const notification = useSelector(state=>state.ui.notification);
    const dispatch = useDispatch();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(notification){
                dispatch(uiActions.removeNotification());
            }
        }, 2000);
        return ()=>clearTimeout(timer);
    }, [dispatch, notification]);
    return(
        <React.Fragment>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <div className="flex">
                <Header />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </React.Fragment>
    );
}

export default RootLayout;