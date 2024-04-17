import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_Url, customer_url, drink_url, food_url } from "../API/apiUrl";

let customerUrl = base_Url + customer_url;
let foodUrl = base_Url + food_url;
let drinkUrl = base_Url + drink_url;

export const getCustomerdata = createAsyncThunk("get/getCustomerdata", async () => {
    const res = await axios.get(customerUrl);
    // console.log("Customer Data: ", res);
    return res?.data;
})

export const getFooddata = createAsyncThunk("get/getFooddata", async () => {
    const res = await axios.get(foodUrl);
    // console.log("Customer Data: ", res);
    return res?.data;
})

export const getDrinkdata = createAsyncThunk("get/getDrinkdata", async () => {
    const res = await axios.get(drinkUrl);
    // console.log("Customer Data: ", res);
    return res?.data;
})

//get single customer data
export const singleCustomerdata = createAsyncThunk("get/singleCustomerdata", async (id) => {
    const res = await axios.get(`${customerUrl}/${id}`);
    // console.log("singleCustomerdata: ", res.data);
    return res?.data;
})

//edit single customer
export const editCustomerdata = createAsyncThunk("put/editCustomerdata", async (prod) => {
    const res = await axios.put(`${customerUrl}/${prod.id}`, prod);
    console.log("editCustomerdata: ", res);
    return res?.data;
})

//delete customer
export const deleteCustomerdata = createAsyncThunk("put/deleteCustomerdata", async (id) => {
    const res = await axios.delete(`${customerUrl}/${id}`);
    console.log("editCustomerdata: ", res);
    return res?.data;
})


const initialValue = {
    userData: [],
    loading: false,
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
            // console.log("Fulfilled action: ", action);
        })
        builder.addCase(getCustomerdata.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ",action);
        })

        //getFooddata
        builder.addCase(getFooddata.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getFooddata.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action);
        })
        builder.addCase(getFooddata.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        })

        //getDrinkdata
        builder.addCase(getDrinkdata.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getDrinkdata.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ",action);
        })
        builder.addCase(getDrinkdata.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        })

        //get single customer data
        builder.addCase(singleCustomerdata.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(singleCustomerdata.fulfilled, (state, action) => {
            // console.log("Edit Fullfilled action: ", action);
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
        })
        builder.addCase(singleCustomerdata.rejected, (state, action) => {
            // console.log("Rejected action: ", action);
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
        })
        //get single customer data ends

        //edit in customer data
        builder.addCase(editCustomerdata.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(editCustomerdata.fulfilled, (state, action) => {
            console.log("Edit Fullfilled action: ", action);
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
        })
        builder.addCase(editCustomerdata.rejected, (state, action) => {
            // console.log("Rejected action: ", action);
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
        })
        //edit in customer data ends

        //delete customer data
        builder.addCase(deleteCustomerdata.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(deleteCustomerdata.fulfilled, (state, action) => {
            console.log("Delete Fullfilled action: ", action);
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
        })
        builder.addCase(deleteCustomerdata.rejected, (state, action) => {
            // console.log("Rejected action: ", action);
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
        })
        //delete customer data ends
    }
})

export default mediaSlice.reducer;
