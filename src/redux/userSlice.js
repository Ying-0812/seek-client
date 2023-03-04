import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogin: false,
        userInfo : {},
    },
    reducers: {
        initUserInfo: (state, {payload})=>{
            state.userInfo = payload;
        },
        changeLoginStatus: (state, {payload}) => {
            state.isLogin = payload;
        },
        setTokenToStorage: (state, {payload}) => {
            localStorage.setItem('token', payload)
        },
        removeTokenToStorage: (state, {payload}) => {
            if(payload) {
                localStorage.removeItem('token')
            }
        }
    }
})

export const {initUserInfo, changeLoginStatus, setTokenToStorage, removeTokenToStorage} = userSlice.actions
export default userSlice.reducer