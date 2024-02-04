import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMailMessage, fetchMailData, readMessage } from "../../store/mailAllActions";
import { mailActions } from "../../store/mailSlice";
import { useNavigate } from "react-router-dom";
import deleteImg from '../../assets/delete.png';
import unreadImg from '../../assets/unread.png';
// import storageDb from "../../store/Config";
// import { ref, deleteObject } from "firebase/storage";

const MailLists = (props) => {
  const mails = props.mails;
  const mailer = props.mailer;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MAX_CHARACTERS = 30;
  const SUBJECT_MAX_CHAR = 10;
  console.log("MailLists");

  useEffect(() => {
    const fetchMail = ()=>{
      dispatch(fetchMailData());
    }
    if (isLoggedIn) {
      fetchMail();
      const interval = setInterval(fetchMail, 5000);
      return ()=>clearInterval(interval);
    } else {
      dispatch(mailActions.clearAllMails());
    }
  }, [isLoggedIn, dispatch]);

  const limitText = (text) => {
    if (text && text.length > MAX_CHARACTERS) {
      return `${text.substring(0, MAX_CHARACTERS)}...`;
    }
    return text;
  };

  const subTextLimit = (text)=>{
    if(text && text.length > SUBJECT_MAX_CHAR){
        return `${text.substring(0, SUBJECT_MAX_CHAR)}...`;
    }
    return text;
}

  const readMessageHandler = (id, isRead) => {
    dispatch(readMessage(id, isRead));
    navigate(`/inbox/${id}`);
  };

  const redirectToMsg = (id)=>{
    navigate(`/sent/${id}`);
  }

  const deleteMailHandler = async(mail) => {
    // if(mail.attachment){
    //     const imgUrl = mail.attachment.downloadURL;
    //     const imageRef = ref(storageDb, imgUrl);
    //     await deleteObject(imageRef);
    //     alert("Image has been successfully deleted from firebase storage!");
    // }
    dispatch(deleteMailMessage(mail.id, mailer));
  };

  return (
    <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-6 w-3/4 h-full m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
      {mails && mails.length > 0 ? (
        mails.map((mail) => (
          <div
            key={mail.id}
            onClick={() => {
                if(mailer === 'receiver')
                    readMessageHandler(mail.id);
                else
                    redirectToMsg(mail.id);  
            }}
            className="border-b-2 cursor-pointer flex relative border-slate-500 w-full h-12 p-2 rounded-lg bg-slate-300"
          >
            <div className="flex gap-2 mx-10">
              {(mailer === 'receiver') && !mail.isRead && (
                <img
                  src={unreadImg}
                  alt="Unread mail."
                  className="w-3 h-3 m-auto mr-2"
                />
              )}
              {(mailer === 'receiver') ? mail.from : `To: ${mail.to}`}
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
};

export default MailLists;
