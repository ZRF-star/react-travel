import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

// @reduxjs/toolkit的combineReducers可以支持处理slice中的reducer的
import { combineReducers } from "@reduxjs/toolkit"
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { ProductDetailSlice } from "./productDetail/slice";


const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail:ProductDetailSlice.reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>

export default store;