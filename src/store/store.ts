// Imports
import { combineReducers } from "redux";
import BlogReducer from "./apps/blog/BlogSlice";
import storage from "redux-persist/lib/storage";
import ChatsReducer from "./apps/chat/ChatSlice";
import ReducerChat from "./apps/chat/ChatReducer";
import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./apps/notes/NotesSlice";
import EmailReducer from "./apps/email/EmailSlice";
import counterReducer from "./counter/counterSlice";
import TicketReducer from "./apps/tickets/TicketSlice";
import ContactsReducer from "./apps/contacts/ContactSlice";
import { persistReducer, persistStore } from "redux-persist";
import CustomizerReducer from "./customizer/CustomizerSlice";
import EcommerceReducer from "./apps/eCommerce/ECommerceSlice";
import UserProfileReducer from "./apps/userProfile/UserProfileSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    reducerChat: ReducerChat,
    counter: counterReducer,
    customizer: persistReducer<any>(persistConfig, CustomizerReducer),
    ecommerceReducer: EcommerceReducer,
    chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ticketReducer: TicketReducer,
    userpostsReducer: UserProfileReducer,
    blogReducer: BlogReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const rootReducer = combineReducers({
  reducerChat: ReducerChat,
  counter: counterReducer,
  customizer: CustomizerReducer,
  ecommerceReducer: EcommerceReducer,
  chatReducer: ChatsReducer,
  emailReducer: EmailReducer,
  notesReducer: NotesReducer,
  contactsReducer: ContactsReducer,
  ticketReducer: TicketReducer,
  userpostsReducer: UserProfileReducer,
  blogReducer: BlogReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
