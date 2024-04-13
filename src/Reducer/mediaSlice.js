import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_Url } from "../API/apiUrl";

let baseUrl = base_Url;


export const getCustomerdata = createAsyncThunk("post/getCustomerdata", async (data) => {
    const res = await axios.get(baseUrl, data);
    console.log("Customer Data: " + res);
    return res?.data;
})

const initialValue = {
    userData: [],
    loadding: false,
    error: null
}

export const mediaSlice = createSlice({
    name: "post",
    initialState: initialValue,

    extraReducers: (builder) => {
        //getCustomerdata
        builder.addCase(getCustomerdata.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getCustomerdata.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            console.log("Fulfilled action: " + action);
        })
        builder.addCase(getCustomerdata.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: " + action);
        })
    }
})

export default mediaSlice.reducer;
