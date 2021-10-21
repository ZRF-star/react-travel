import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
interface ProductDetailState {
    loading:boolean,
    error:string | null,
    data: any,
}

const initialState:ProductDetailState = {
    loading:true,
    error:null,
    data:null,
}

export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail", 
    async (touristRouteId:string, thunkAPI) => {
        const { data } = await axios.get(
          `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );

        return data;
    }
)

export const ProductDetailSlice = createSlice({
    name:"productDetail",
    initialState,
    reducers:{},
    extraReducers:{
        [getProductDetail.pending.type]:(state) => {
            return {...state, loading:true}
        },
        [getProductDetail.fulfilled.type]:(state, action) => {
            return {
                ...state,
                loading:false,
                data:action.payload,
            }
        },
        [getProductDetail.rejected.type]:(state, action) => {
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        }
    }

}) 