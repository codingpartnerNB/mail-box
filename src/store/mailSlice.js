import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMailMsg: [],
  receivedMailMsg: [],
  sentMailMsg: [],
  unreadMails: 0,
  totalMails: 0,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    addCurrentMail(state, action) {
      state.currentMailMsg.push(action.payload);
    },
    addReceivedMails(state, action) {
      state.receivedMailMsg = action.payload;
    },
    addSentMails(state, action) {
      state.sentMailMsg = action.payload;
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
    deleteReceivedMail(state, action) {
      const mailToDelete = state.receivedMailMsg.find(
        (mail) => mail.id === action.payload
      );
      if (mailToDelete) {
        state.receivedMailMsg = state.receivedMailMsg.filter(
          (delMail) => delMail.id !== action.payload
        );
      }
    },
    deleteSentMail(state, action) {
      const mailToDelete = state.sentMailMsg.find(
        (mail) => mail.id === action.payload
      );
      if (mailToDelete) {
        state.sentMailMsg = state.sentMailMsg.filter(
          (delMail) => delMail.id !== action.payload
        );
      }
    },
    clearAllMails(state) {
      state.currentMailMsg = [];
      state.receivedMailMsg = [];
      state.sentMailMsg = [];
      state.unreadMails = 0;
      state.totalMails = 0;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
