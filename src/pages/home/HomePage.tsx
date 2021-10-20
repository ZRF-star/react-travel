import React from "react";
import { Row, Col, Typography, Spin } from 'antd';
import axios from 'axios';
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { Header, Footer, Carousel, SideMenu, ProductCollection } from "../../components";
import { RootState } from '../../redux/store';
import { 
    fetchRecommendProductsActionCreator,
    fetchRecommendProductsActionSuccessCreator,
    fetchRecommendProductsActionFailCreator
} from '../../redux/recommendProducts/recommendProductsActions';
import styles from './HomePage.module.css';

interface IHomePageState {}
interface IHomePageProps {} 

type Props = IHomePageProps 
            & WithTranslation 
            & ReturnType<typeof mapStateToProps> 
            & ReturnType<typeof mapDispatchToProps>;

class HomePageComponet extends React.Component<Props,IHomePageState> {

    async componentDidMount() {
            this.props.fetchStart();
        try {
            const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections");
            this.props.fetchSuccess(data);
        } catch(e) {
            this.props.fetchFail(e);
        }
        
    }

    render() {
        const { productList, loading, error, t  } = this.props;

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
        {/* 页面的内容 content */}
        <div className={styles['page-content']}>
            <Row style={{ marginTop: 20 }}>
                <Col span={6}>
                    <SideMenu />
                </Col>
                <Col span={18}>
                    <Carousel />
                </Col>
            </Row>
            { productList.length > 0 ? (<><ProductCollection
                title={<Typography.Title level={3} type="warning">{t("home_page.hot_recommended")}</Typography.Title>}
                sideImage={sideImage}
                products={productList[0].touristRoutes}
            />
             <ProductCollection
                title={<Typography.Title level={3} type="danger">{t("home_page.new_arrival")}</Typography.Title>}
                sideImage={sideImage2}
                products={productList[1].touristRoutes}
            />
            <ProductCollection
                title={<Typography.Title level={3} type="success">{t("home_page.domestic_travel")}</Typography.Title>}
                sideImage={sideImage3}
                products={productList[2].touristRoutes}
            /></>) :null}
        </div>
        <Footer />
        </>
    }
}

function mapStateToProps(state:RootState) {
    return {
        productList:state.recommendProductsReducer.productList,
        loading:state.recommendProductsReducer.loading,
        error:state.recommendProductsReducer.error,
    }
}
function mapDispatchToProps(dispatch) {
    return {
       fetchStart: () => {
           dispatch(fetchRecommendProductsActionCreator());
       },
       fetchSuccess:(data) => {
           dispatch(fetchRecommendProductsActionSuccessCreator(data));
       },
       fetchFail:(error) => {
           dispatch(fetchRecommendProductsActionFailCreator(error))
       }
    }
}
// withTranslation()(HomePageComponet) 第一个小括号代表的是语言所使用的命名空间
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponet));