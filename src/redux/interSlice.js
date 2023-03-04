import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInterviewList } from '../api/interview'

export const getAllInterview = createAsyncThunk(
    "interview/interviewList",
    async() => {
        const res = await getInterviewList()
        return res.data
    }
)

const interSlice = createSlice({
    name: 'interview',
    initialState: {
        interview: [],
    },
    reducers: {},
    extraReducers: {
        [getAllInterview.fulfilled]: (state, { payload }) => {
            state.interview = payload
        }
    }
})

export default interSlice.reducer