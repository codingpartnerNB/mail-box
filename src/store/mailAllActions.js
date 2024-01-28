import { mailActions } from "./mailSlice";
import { uiActions } from "./uiSlice";

export const addMailHandler = (mail, senderEmail, email)=>{
    return async(dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Adding...",
              message: "Sending mail!",
            })
        );
        const addMail = async()=>{
            const res = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${email}/inbox.json`, {
                method: 'POST',
                body: JSON.stringify(mail),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const senderRes = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${senderEmail}/sent.json`, {
                method: 'POST',
                body: JSON.stringify(mail),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!res.ok){
                throw new Error("Failed to storing inbox mails!");
            }
            if(!senderRes.ok){
                throw new Error("Failed to storing sent mails!");
            }
            const resdata = await res.json();
            // console.log(resdata);
            return resdata;
        }
        try{
            const resdata = await addMail();
            const data = {...mail, id: resdata.name};
            // console.log(data);
            dispatch(mailActions.addSentMails(data));
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Sent mail successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Sending mail failed!",
                })
            );
            console.log(error);
        }
    }
}