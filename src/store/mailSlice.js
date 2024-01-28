import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentMailMsg: [],
  receivedMailMsg: [],
  sentInboxMail: [],
  unreadMails: 0,
  totalMails: 0,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    addSentMails(state, action) {
      state.sentMailMsg.push(action.payload);
    },
    addReceivedMails(state, action) {

    }
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
