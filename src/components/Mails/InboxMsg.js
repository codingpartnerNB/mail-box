import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { uiActions } from "../../store/uiSlice";

const InboxMsg = ()=>{
    const { msgId } = useParams();
    const dispatch = useDispatch();
    // console.log(msgId);
    const receivedMails = useSelector(state=>state.mail.receivedMailMsg);

    const msg = receivedMails.find(mail=>mail.id === msgId);
    if(!msg){
        return(
            <section key={msg.id} className="border-2 border-amber-900 bg-amber-100 rounded-lg my-14 w-3/4 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
                <p className="text-center text-amber-900 m-auto my-10">Mail not found!</p>
            </section>
        );
    }

    const openInNewTab = ()=>{
        const newWindow = window.open(msg.attachment.downloadURL,'_blank');
        if(newWindow){
            newWindow.focus();
        }else{
            dispatch(uiActions.showNotification({
                status: "Error",
                title: "Failed to open!",
                message: "Failed to open a new tab/window. Please check browser settings.",
            }));
        }
    }

    return(
        <section key={msg.id} className="border-2 border-amber-900 bg-amber-100 rounded-lg my-14 w-3/4 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
            <div className="mx-5 my-10">
                <div className="font-semibold my-5">{msg.from}</div>
                <div className="my-5 font-bold">{msg.subject}</div>
                <div>{msg.body}</div>
                {msg.attachment && msg.attachment.type === 'image.jpeg' && msg.attachment.type === 'image.png' ?
                    (<div>
                        <img src={msg.attachment.downloadURL} onClick={openInNewTab} alt="Attachment" className="w-64 rounded-lg my-4 cursor-pointer" />
                    </div>)
                    :(
                        <div className="my-4"><Link to={msg.attachment.downloadURL} className="text-blue-800" >{msg.attachment.name}</Link></div>
                    )
                }
            </div>
        </section>
    );
}

export default InboxMsg;