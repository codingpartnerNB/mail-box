import { mailActions } from "./mailSlice";

export const addMailHandler = (mail, email)=>{
    return async(dispatch)=>{
        const url = `https://mail-box-288ad-default-rtdb.firebaseio.com/${email}mails`;
        const addMail = async()=>{
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(mail),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!res.ok){
                throw new Error("Something went wrong while storing mails!");
            }
            const resdata = await res.json();
            console.log(resdata);
            return resdata;
        }
        try{
            const resdata = await addMail();
            const data = {...mail, id: resdata.name};
            dispatch(mailActions.addMail(data));
        }catch(error){
            console.log(error);
        }
    }
}