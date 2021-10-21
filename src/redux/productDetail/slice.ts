import { createSlice } from '@reduxjs/toolkit'

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
export const ProductDetailSlice = createSlice({
    name:"productDetail",
    initialState,
    reducers:{
        fetchStart:(state) => {
            return {...state, loading:true}
        },
        fetchSuccess:(state, action) => {
            return {
                ...state,
                loading:false,
                data:action.payload,
            }
        },
        fetchFail:(state, action) => {
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        }
    }

}) 