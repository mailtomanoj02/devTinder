import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionsReducer from "./ConnectionSlice";
import requestsReducer from "./RequestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});
