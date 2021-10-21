// @reduxjs/toolkit的combineReducers可以支持处理slice中的reducer的
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { actionLog } from "./middlewares/actionLog";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { ProductDetailSlice } from "./productDetail/slice";


const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail:ProductDetailSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools:true,
})
export type RootState = ReturnType<typeof store.getState>

export default store;