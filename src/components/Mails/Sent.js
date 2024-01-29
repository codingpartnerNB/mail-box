import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import deleteImg from '../../assets/delete.png';
import { useEffect } from "react";
import { deleteSentMailMessage, fetchMailData } from "../../store/mailAllActions";
import { mailActions } from "../../store/mailSlice";

const Sent = ()=>{
    const sentMails = useSelector(state=>state.mail.sentMailMsg);
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const MAX_CHARACTERS = 30;
    const SUBJECT_MAX_CHAR = 10;

    useEffect(()=>{
        if(isLoggedIn){
            dispatch(fetchMailData());
        }else{
            dispatch(mailActions.clearAllMails());
        }
    }, [isLoggedIn, dispatch]);

    const limitText = (text)=>{
        if(text && text.length > MAX_CHARACTERS){
            return `${text.substring(0, MAX_CHARACTERS)}...`;
        }
        return text;
    }

    const subTextLimit = (text)=>{
        if(text && text.length > SUBJECT_MAX_CHAR){
            return `${text.substring(0, SUBJECT_MAX_CHAR)}...`;
        }
        return text;
    }

    const deleteMailHandler = (mail)=>{
        dispatch(deleteSentMailMessage(mail.id));
    }

    const redirectToMsg = (id)=>{
        navigate(`/sent/${id}`);
    }
    
    return(
        <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-6 w-3/4 h-full m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
            {sentMails && sentMails.length > 0 ? (
                sentMails.map((mail) => (
                    <div
                      key={mail.id}
                      onClick={()=>{
                        redirectToMsg(mail.id);
                      }}
                      className="border-b-2 cursor-pointer flex relative border-slate-500 w-full h-12 p-2 rounded-lg bg-slate-300"
                    >
                      <div className="flex gap-2 mx-10">
                        To: {mail.to}
                      </div>
                      <div className="flex gap-2 mx-10">
                        {subTextLimit(mail.subject)}
                        <span className="text-slate-600">{limitText(mail.body)}</span>
                      </div>
                      <div className="absolute right-0">
                        <span className="mx-5">{mail.atTime}</span>
                        <span className="mx-5">{mail.atDate}</span>
                          <button
                          className="mx-5"
                          onClick={(event) => {
                              event.stopPropagation();
                              deleteMailHandler(mail);
                          }}
                          >
                          <img src={deleteImg} alt="Remove mail" className="w-5" />
                          </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-12 p-2 text-center rounded-lg bg-slate-300">
                    No Mail is Found!
                  </div>
            )}
        </section>
    );
}

export default Sent;