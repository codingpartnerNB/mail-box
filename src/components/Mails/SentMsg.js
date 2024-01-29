import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { uiActions } from "../../store/uiSlice";
import { deleteSentMailMessage, fetchMailData } from "../../store/mailAllActions";
import { mailActions } from "../../store/mailSlice";
import remove from "../../assets/delete.png";

const SentMsg = () => {
  const { msgId } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(msgId);
  const sentMails = useSelector((state) => state.mail.sentMailMsg);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMailData());
    } else {
      dispatch(mailActions.clearAllMails());
    }
  }, [isLoggedIn, dispatch]);

  const msg = sentMails.find((mail) => mail.id === msgId);
  if (!msg) {
    return (
      <section className="border-2 border-amber-900 bg-amber-100 rounded-lg my-14 w-3/4 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
        <p className="text-center text-amber-900 m-auto my-10">
          Mail not found!
        </p>
      </section>
    );
  }

  const openInNewTab = () => {
    const newWindow = window.open(msg.attachment.downloadURL, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Failed to open!",
          message:
            "Failed to open a new tab/window. Please check browser settings.",
        })
      );
    }
  };

  const deleteMailHandler = async (id) => {
    dispatch(deleteSentMailMessage(id));
    navigate('/inbox');
  };

  return (
    <section
      key={msg.id}
      className="border-2 border-amber-900 bg-amber-100 rounded-lg my-14 w-3/4 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900"
    >
      <div className="mx-5 my-10 relative">
        <img
          src={remove}
          alt="Mail remove"
          onClick={() => {
            deleteMailHandler(msg.id);
          }}
          className="w-7 absolute right-0 top-[-20px] cursor-pointer"
        />
        <div className="font-semibold my-5">{msg.to}</div>
        <div className="my-5 font-bold">{msg.subject}</div>
        <div>{msg.body}</div>
        {msg.attachment ?
          (msg.attachment.type === "image/jpeg" ||
          msg.attachment.type === "image/png") ? (
            <img
              src={msg.attachment.downloadURL}
              onClick={openInNewTab}
              alt="Attachment"
              className="w-64 rounded-lg my-4 cursor-pointer"
            />
          ) : (
            <div className="my-5">
                <Link
                    to={msg.attachment.downloadURL}
                    className="text-blue-800"
                >
                    {msg.attachment.name}
                </Link>
            </div>
          ):
          (
            <div></div>
          )}
      </div>
    </section>
  );
};

export default SentMsg;
