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

export const fetchMailData = ()=>{
    return async(dispatch, getState)=>{
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Fetching...",
              message: "Fetching mail!",
            })
        );
        const email = getState().auth.email;
        const fetchMails = async()=>{
            const inboxRes = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${email.replace(/[@.]/g, '')}/inbox.json`);
            if(!inboxRes){
                throw new Error("Failed to fetch inbox mails!");
            }
            
            const inboxData = await inboxRes.json();
            return inboxData;
        }
        try{
            const inboxData = await fetchMails();

            if(inboxData){
                const inboxMails = Object.keys(inboxData).map(key=>(
                    {id: key, ...inboxData[key]}
                ));
                
                dispatch(mailActions.addReceivedMails(inboxMails));
            
            }
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "All mails are here!",
                })
            );
        } catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Fetching mail failed!",
                })
            );
            console.log(error);
        }
    }
}