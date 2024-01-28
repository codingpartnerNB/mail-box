import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMailData } from "../../store/mailAllActions";
import { mailActions } from "../../store/mailSlice";
import { useNavigate } from "react-router-dom";


const Inbox = ()=>{
    const receivedMails = useSelector(state=>state.mail.receivedMailMsg);
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isLoggedIn){
            dispatch(fetchMailData());
        }else{
            dispatch(mailActions.clearAllMails());
        }
    }, [isLoggedIn, dispatch]);


    return(
        <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-6 w-3/4 h-full m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
            {receivedMails && receivedMails.length > 0 ? (
                receivedMails.map(mail=>(
                    <div key={mail.id} onClick={()=>{navigate(`/inbox/${mail.id}`)}} className="border-b-2 cursor-pointer flex justify-evenly border-slate-500 w-full h-12 p-2 rounded-lg bg-slate-300">
                        <div>{mail.from}</div>
                        <div className="flex gap-2">
                            {mail.subject}
                            <span className="text-slate-600">{mail.body}</span>
                        </div>
                        <div className="flex gap-4">
                            <span>{mail.atTime}</span>
                            <span>{mail.atDate}</span>
                        </div>
                    </div>
                ))
            ):(
                <div className="w-full h-12 p-2 text-center rounded-lg bg-slate-300">
                    No Mail is Found!
                </div>
            )}
        </section>
    );
}

export default Inbox;