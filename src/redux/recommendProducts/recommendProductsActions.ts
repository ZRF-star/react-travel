import { ThunkAction } from 'redux-thunk'
import axios from 'axios';
import { RootState } from "../store";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 推荐信息调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 推荐信息调用失败

interface FetchRecommendProductsAction {
    type:typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
    type:typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload:any,
}

interface FetchRecommendProductsFailAction {
    type:typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload:any,
}

export type RecommendProductsAction = 
    | FetchRecommendProductsAction
    | FetchRecommendProductsSuccessAction
    | FetchRecommendProductsFailAction;

export const fetchRecommendProductsActionCreator = ():FetchRecommendProductsAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START,
    }
}


export const fetchRecommendProductsActionSuccessCreator = (data):FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload:data,
    }
}


export const fetchRecommendProductsActionFailCreator = (error):FetchRecommendProductsFailAction => {
    return {
        type:FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload:error,
    }
}

export const getMeDataActionFailCreator = ():ThunkAction<
        void, 
        RootState, 
        null, 
        RecommendProductsAction
        > => async (dispatch, getState) => {
            dispatch(fetchRecommendProductsActionCreator);
            try {
                const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections");
                dispatch(fetchRecommendProductsActionSuccessCreator(data));
            } catch(e) {
                dispatch(fetchRecommendProductsActionFailCreator(e));
            }
            
        }