import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentMailMsg: [],
  receivedMailMsg: [],
  inboxMailMsg: [],
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
      state.receivedMailMsg = action.payload;
    },
    addInboxMails(state, action) {
      state.inboxMailMsg = action.payload;
    },
    updateTotalMsg(state, action) {
      state.totalMails = action.payload;
    },
    markMessageAsRead(state, action) {
      const { msgId, isRead } = action.payload;
      state.receivedMailMsg = state.receivedMailMsg.map((msg) =>
        msg.id === msgId ? { ...msg, isRead: isRead } : msg
      );
    },
    updateUnreadMsg(state, action) {
      state.unreadMails = action.payload;
    },
    deleteMail(state, action) {
      const mailToDelete = state.receivedMailMsg.find(
        (mail) => mail.id === action.payload
      );
      if (mailToDelete) {
        state.receivedMailMsg = state.receivedMailMsg.filter(
          (delMail) => delMail.id !== action.payload
        );
      }
    },
    clearAllMails(state) {
      state.sentMailMsg = [];
      state.receivedMailMsg = [];
      state.inboxMailMsg = [];
      state.unreadMails = 0;
      state.totalMails = 0;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
