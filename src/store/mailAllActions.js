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
            dispatch(mailActions.addCurrentMail(data));
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
                    message: "Failed to send mail!",
                })
            );
            console.log(error);
        }
    }
}

export const fetchMailData = ()=>{
    return async(dispatch, getState)=>{
        const email = getState().auth.email;
        const fetchMails = async()=>{
            const inboxRes = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${email.replace(/[@.]/g, '')}/inbox.json`);
            if(!inboxRes){
                throw new Error("Failed to fetch inbox mails!");
            }

            const sentRes = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${email.replace(/[@.]/g, '')}/sent.json`);
            if(!sentRes.ok){
                throw new Error("Failed to fetch sent mails!");
            }

            const inboxData = await inboxRes.json();
            const sentData = await sentRes.json();
            return { inboxData, sentData };
        }
        try{
            const { inboxData, sentData } = await fetchMails();

            if(inboxData){
                const inboxMails = Object.keys(inboxData).map(key=>(
                    {id: key, ...inboxData[key]}
                ));
                
                dispatch(mailActions.addReceivedMails(inboxMails));
                const unreadInboxMails = inboxMails.filter(mail=>!mail.isRead);
                dispatch(mailActions.updateUnreadMsg(unreadInboxMails.length));
            }

            // if(!sentData){
            //     dispatch(mailActions.clearAllMails());
            // }

            if(sentData){
                const sentMails = Object.keys(sentData).map((key)=> (
                    {id: key, ...sentData[key],}
                ));
                dispatch(mailActions.addSentMails(sentMails));
                dispatch(mailActions.updateTotalMsg(sentMails.length));
            }
        } catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Failed to fetch mail!",
                })
            );
            console.log(error);
        }
    }
}

export const readMessage = (id, isRead)=>{
    return async(dispatch,getState)=>{
        const email = getState().auth.email;
        const reading = async()=>{
            const res = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${email.replace(/[@.]/g, '')}/inbox/${id}.json`,{
                method: 'PATCH',
                body: JSON.stringify({isRead: true}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!res.ok){
                throw new Error("Failed to update inbox isRead!");
            }
            const data = await res.json();
            // console.log(data);
            return data;
        }
        try{
            const data = await reading();
            dispatch(mailActions.markMessageAsRead({msgId: id, isRead: data.isRead}));
            if(isRead){
                dispatch(mailActions.updateUnreadMsg(-1));
            }
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Failed to read mail!",
                })
            );
            console.log(error);
        }
    }
}

export const deleteInboxMailMessage = (id)=>{
    return async(dispatch, getState)=>{
        const email = getState().auth.email;
        const deleting = async()=>{
            const res = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${email.replace(/[@.]/g, '')}/inbox/${id}.json`,{
                method: 'DELETE',
            });
            if(!res.ok){
                throw new Error("Failed to delete mail in inbox!");
            }
        }
        try{
            await deleting();
            dispatch(mailActions.deleteReceivedMail(id));
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Mail has been deleted successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Failed to delete mail in inbox!",
                })
            );
            console.log(error);
        }
    }
}

export const deleteSentMailMessage = (id)=>{
    return async(dispatch, getState)=>{
        const email = getState().auth.email;
        const deleting = async()=>{
            const res = await fetch(`https://mail-box-288ad-default-rtdb.firebaseio.com/composeMail/${email.replace(/[@.]/g, '')}/sent/${id}.json`,{
                method: 'DELETE',
            });
            if(!res.ok){
                throw new Error("Failed to delete mail in sentbox!");
            }
        }
        try{
            await deleting();
            dispatch(mailActions.deleteSentMail(id));
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Mail has been deleted successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Failed to delete mail in sentbox!",
                })
            );
            console.log(error);
        }
    }
}