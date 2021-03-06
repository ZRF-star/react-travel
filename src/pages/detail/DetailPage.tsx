import React, { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, Divider, Typography, DatePicker, Anchor,Menu, Button } from "antd";
import { useDispatch } from "react-redux";
import { ProductDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
// 引入自己封装的useSelector
import { useSelector } from "../../redux/hooks";
import { commentMockData } from "./mockup";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro, ProductComments } from "../../components";
import { MainLayout } from "../../layouts/mainLayout/MainLayout";
import { addShoppingCartItem } from '../../redux/shoppingCart/slice';
import { ShoppingOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>();
  const loading = useSelector<boolean>(state => state.productDetail.loading);
  const error = useSelector<string | null>(state => state.productDetail.error);
  const product = useSelector<any>(state => state.productDetail.data);
  const jwt = useSelector(state => state.user.token);
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProductDetail(touristRouteId));
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }
  return (
    <>
      <MainLayout>
        {/* 产品简介 与 日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                 style={{
                   marginTop:50,
                   marginBottom:30,
                   display:"block",
                 }}
                 type="primary"
                 danger
                 loading={shoppingCartLoading}
                 onClick={() => {
                   dispatch(addShoppingCartItem({
                     jwt:jwt as string,
                     touristRouteId:product.id
                   }))
                 }}
              >
                放入购物车
                <ShoppingOutlined />
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.features}} style={{margin:50}}></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={'center'}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.fees}} style={{margin:50}}></div>
        </div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={'center'}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.notes}} style={{margin:50}}></div>
        </div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}>
           <Divider orientation={'center'}>
            <Typography.Title level={3}>评论</Typography.Title>
          </Divider>
          <div style={{ margin:40 }}>
            <ProductComments data={commentMockData}/>
          </div>
          
        </div>
     </MainLayout>
    </>
  );
};
