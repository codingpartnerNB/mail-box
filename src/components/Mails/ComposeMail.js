import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMailHandler } from "../../store/mailAllActions";
import storageDb from "../../store/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import attachFile from '../../assets/attach-file.png';
import remove from '../../assets/remove.png';

const ComposeMail = () => {
  const userEmail = useRef();
  const userSubject = useRef();
  const userBody = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);

  //Attachment variables
  const [attachment, setAttachment] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isImage, setIsImage] = useState(false);

  //Setting current date for mails
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth()+1).toString().padStart(2,'0');
  const date = today.getDate().toString().padStart(2,'0');

  const hours = today.getHours().toString().padStart(2,'0');
  const minutes = today.getMinutes().toString().padStart(2,'0');

  const formattedDate = `${date}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;
  // console.log(formattedDate);
  // console.log(formattedTime);

  
  const submitMailHandler = async(event) => {
    event.preventDefault();
    const enteredEmail = userEmail.current.value;
    const enteredSubject = userSubject.current.value;
    const body = userBody.current.value;
    let attachmentData = null;
    if (attachment) {
      const storageRef = ref(storageDb,`attachments/${v4()}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, attachment)
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      attachmentData = {
        name: attachment.name,
        type: attachment.type,
        downloadURL: downloadURL
      };
    }
    const mail = {
      from: email,
      to: enteredEmail,
      subject: enteredSubject,
      body: body,
      attachment: attachmentData,
      atDate: formattedDate,
      atTime: formattedTime,
    };
    // console.log(mail);
    btnClick();
    dispatch(addMailHandler(mail, email.replace(/[@.]/g, ''), enteredEmail.replace(/[@.]/g, "")));
    userEmail.current.value = '';
    userSubject.current.value = '';
    userBody.current.value = '';
    setAttachment(null);
  }

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
    // console.log(file);
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the result of FileReader as the src for preview
        const preview = e.target.result;
        setPreviewSrc(preview);

        const fileType = file.type || file.name.split('.').pop().toLowerCase();
        if (fileType.startsWith('image/')) {
            setIsImage(true);
        }
        // You might want to use this in your UI to show the preview
        // console.log("Preview Source:", preview);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setPreviewSrc(null);
    setIsImage(false);
  };

  const throttling = (callback, delay)=>{
    let timer;
    return function(){
      if(timer) clearTimeout(timer);
      setIsLoading(true);
      timer = setTimeout(()=>{
        callback();
      }, delay);
    }
  }
  const btnClick = throttling(()=>{
    setIsLoading(false);
  },500);

  return (
    <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-6 w-3/4 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
      <form onSubmit={submitMailHandler} className="mx-6 my-4">
        <div className="flex gap-4">
          <label htmlFor="to" className="my-2">
            To:
          </label>
          <input
            type="email"
            id="to"
            ref={userEmail}
            className="w-full border-2 border-gray-400 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800"
            required
          />
        </div>
        <hr />
        <input
          type="text"
          ref={userSubject}
          placeholder="Subject"
          className="w-full border-2 border-gray-400 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800"
          required
        />
        <hr />
        {!attachment && (
            <div className="float-right">
                <label htmlFor="attachment" className="block my-2">
                    <img src={attachFile} alt="Attach something here." className="w-4 cursor-pointer" />
                </label>
                <input
                    type="file"
                    id="attachment"
                    className="hidden"
                    accept="image/*, .pdf, .doc, .docx"
                    onChange={handleAttachmentChange}
                />
          </div>
        )}
        {attachment && (
          <div className="relative float-right mx-4 mt-3">
            {isImage && <img src={previewSrc} className="w-36 rounded-md" alt="Preview Attachment" />}
            {!isImage && <span className="p-6">{attachment.name}</span>}
            <img
              src={remove}
              alt="Remove Attachment"
              onClick={handleRemoveAttachment}
              className="w-3 absolute cursor-pointer top-0 right-0"
            />
          </div>
        )}
        <textarea
          ref={userBody}
          className="w-full h-[40vh] my-4 p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-2 focus:border-amber-800"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-amber-700 text-white w-full p-1.5 my-2 rounded-lg text-bold hover:bg-amber-900"
        >
          Send mail
        </button>
      </form>
    </section>
  );
};

export default ComposeMail;
