// @reduxjs/toolkit的combineReducers可以支持处理slice中的reducer的
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { actionLog } from "./middlewares/actionLog";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { ProductDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice"
import { UserSlice } from "./user/slice";
import { shoppingCartSlice } from './shoppingCart/slice';
import { orderSlice } from './order/slice';

const persistConfig = {
    key: "root",
    storage,
    whitelist:["user"] ,
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail:ProductDetailSlice.reducer,
    searchProduct:productSearchSlice.reducer,
    user:UserSlice.reducer,
    shoppingCart:shoppingCartSlice.reducer,
    order:orderSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools:true,
})

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export default { store, persistor };