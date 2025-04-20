import { configureStore } from "@reduxjs/toolkit";
import { reactionSlice } from "./reaction/reactionSlice";

export default configureStore({
    reducer: {
        reactions: reactionSlice.reducer
    },
})