import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import typeSlice from './typeSlice'
import interSlice from './interSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        type: typeSlice,
        inter: interSlice
    }
})