import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import chatReducer from "@/store/chatSlice";
import notificationsReducer from "@/store/notificationsSlice";
import creditsReducer from "@/store/creditsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
    credits: creditsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
