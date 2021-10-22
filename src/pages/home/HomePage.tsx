import React from "react";
import { Row, Col, Typography, Spin } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { Header, Footer, Carousel, SideMenu, ProductCollection } from "../../components";
import { RootState } from '../../redux/store';
import { 
    getMeDataActionFailCreator,
} from '../../redux/recommendProducts/recommendProductsActions';
import styles from './HomePage.module.css';
import { MainLayout } from "../../layouts/mainLayout/MainLayout";

interface IHomePageState {}
interface IHomePageProps {} 

type Props = IHomePageProps 
            & WithTranslation 
            & ReturnType<typeof mapStateToProps> 
            & ReturnType<typeof mapDispatchToProps>;

class HomePageComponet extends React.Component<Props,IHomePageState> {

    componentDidMount() {
        this.props.giveMeData();
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
       <MainLayout>
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
       </MainLayout>
        </>
    }
}

function mapStateToProps(state:RootState) {
    return {
        productList:state.recommendProducts.productList,
        loading:state.recommendProducts.loading,
        error:state.recommendProducts.error,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        giveMeData:() => { 
            dispatch(getMeDataActionFailCreator()) 
        }
    }
}
// withTranslation()(HomePageComponet) 第一个小括号代表的是语言所使用的命名空间
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponet));