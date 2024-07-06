import { configureStore } from "@reduxjs/toolkit";
import fileSystemSlice from "./fileSystemSlice";

export const appStore = configureStore({

    reducer: {
        fileSystemSlice:fileSystemSlice
    },

})