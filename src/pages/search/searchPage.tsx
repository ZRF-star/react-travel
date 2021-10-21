import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { searchProduct } from '../../redux/productSearch/slice'
import { Header, Footer, FilterArea, ProductList } from '../../components';
import { useSelector } from '../../redux/hooks';
import styles from './SearchPage.module.css';

interface MatchParams {
    keywords:string
}
export const SearchPage:React.FC = () => {
    const { keywords } = useParams<MatchParams>();
    const loading = useSelector<boolean>(state => state.searchProduct.loading);
    const error = useSelector<string | null>(state => state.searchProduct.error);
    const data = useSelector(state => state.searchProduct.data);
    const pagination = useSelector(state => state.searchProduct.pagination);
    
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(searchProduct({nextPage:1, pageSize:10, keywords}))
    }, [location])

    const onPageChange = (nextPage, pageSize) => {
        dispatch(searchProduct({nextPage, pageSize, keywords}))
    }

    if(loading) {
        return <Spin style={{
            width:"100%",
            marginTop:200,
            marginLeft:'auto',
            marginRight:'auto',
        }}></Spin>
    } 
    if(error) {
        return <div>error:{error}</div>
    }

    return <> 
    <Header />
    {/* 分类过滤器 */}
    <div className={styles["page-content"]}>
        <FilterArea />
    </div>
    {/* 产品列表 */}
    <div className={styles['product-list-container']}>
        <ProductList data={data} paging={pagination} onPageChange={onPageChange}/>
    </div>
    <Footer /> 
    </>
}