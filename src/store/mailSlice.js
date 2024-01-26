import { createSlice } from "@reduxjs/toolkit";


const initialState = {mails: [], totalMails: 0};

const mailSlice = createSlice({
    name: "mail",
    initialState,
    reducers: {
        addMail(state, action){
            state.mails.push(action.payload);
            state.totalMails++;
        }
    }
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;