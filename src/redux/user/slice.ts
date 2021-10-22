import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
interface UserState {
    loading:boolean,
    error:string | null,
    token:string | null,
}

const initialState:UserState = {
    loading:false,
    error:null,
    token:null,
}

export const signIn = createAsyncThunk(
    "user/signIn", 
    async (paramaters:{
        email:string,
        password:string,
    }, thunkAPI) => {
        const { data } = await axios.post(
          `http://123.56.149.216:8080/auth/login`, {
              email:paramaters.email,
              password:paramaters.password,
          }
        );
        return data;
    }
)

export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:{
        [signIn.pending.type]:(state) => {
            return {...state, loading:true}
        },
        [signIn.fulfilled.type]:(state, action) => {
            return {
                ...state,
                loading:false,
                token:action.payload.token,
            }
        },
        [signIn.rejected.type]:(state, action) => {
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        }
    }

}) 