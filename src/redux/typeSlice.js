import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTypeList } from '../api/issue'

export const getAllTypeList = createAsyncThunk(
    "type/typeList",
    // async (_, thunkApi) => {
    //     const res = await getTypeList()
    //     thunkApi.dispatch(initTypeList(res.data))
    // }
    async() => {
        const res = await getTypeList()
        return res.data
    }
)

const typeSlice = createSlice({
    name: 'typeSlice',
    initialState: {
        typeList: [],
        typeSearch: ''
    },
    reducers: {
        // initTypeList: (state, {payload}) => {
        //     state.typeList = payload
        // }
        initTypeSearch: (state, { payload }) => {
            state.typeSearch = payload
        }
    },
    extraReducers: {
        [getAllTypeList.fulfilled]: (state, { payload }) => {
            state.typeList = payload
        }
    }
})

export const { initTypeSearch } = typeSlice.actions
export default typeSlice.reducer