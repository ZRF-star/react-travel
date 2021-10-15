import React from "react";
import styles from "./Header.module.css";
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter,RouteComponentProps } from 'react-router-dom'
import store from '../../redux/store'
import { LanguageState } from '../../redux/languageReducer'

interface IHeaderProps {}
interface State extends LanguageState {}

type Props = IHeaderProps & RouteComponentProps;

export class HeaderComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        const storeState = store.getState();
        this.state = {
            language:storeState.language,
            languageList:storeState.languageList
        }
        store.subscribe(() => {
            const storeState = store.getState();
            this.setState({
                language:storeState.language
            })
        })
    }

    private handleMenuClick = (e) => {
        console.log(e);
        const action = {
            type:"change_language",
            payload:e.key
        }
        store.dispatch(action);
    }

    render() {
        const { history } = this.props;
        return (
            <div className={styles['app-header']}>
                {/* top-header */}
                <div className={styles['top-header']}>
                    <div className={styles.inner}>
                        <Typography.Text>让旅游更幸福</Typography.Text>
                        <Dropdown.Button
                            style={{ marginLeft: 15 }}
                            overlay={
                                <Menu onClick={this.handleMenuClick}>
                                    {this.state.languageList.map(item => {
                                        return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                                    })}
                                    <Menu.Item key={"new"}>添加语言</Menu.Item>
                                </Menu>
                            }
                            icon={<GlobalOutlined />}
                        >
                            {this.state.language === "zh" ? "中文" : "English"}
                        </Dropdown.Button>
                        <Button.Group className={styles['botton-group']}>
                            <Button onClick={() => history.push('register')}>注册</Button>
                            <Button onClick={() => history.push('signIn')}>登录</Button>
                        </Button.Group>
                    </div>
                </div>
                <Layout.Header className={styles['main-header']}>
                    <span onClick={() => history.push('/')}>
                        <img src={logo} alt="logo" className={styles['App-logo']} />
                        <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
                    </span>
               
                    <Input.Search className={styles['search-input']}
                        placeholder={'请输入旅游目的地、主题、或关键字'}
                    />
                </Layout.Header>
                <Menu mode={"horizontal"} className={styles['main-menu']}>
                    <Menu.Item key={1}>旅游首页</Menu.Item>
                    <Menu.Item key={2}>周末游</Menu.Item>
                    <Menu.Item key={3}>跟团游</Menu.Item>
                    <Menu.Item key={4}>自由行</Menu.Item>
                    <Menu.Item key={5}>私家团</Menu.Item>
                    <Menu.Item key={6}>游轮</Menu.Item>
                    <Menu.Item key={7}>酒店+景点</Menu.Item>
                    <Menu.Item key={8}>当地玩乐</Menu.Item>
                    <Menu.Item key={9}>主题游</Menu.Item>
                    <Menu.Item key={10}>定制游</Menu.Item>
                    <Menu.Item key={11}>游学</Menu.Item>
                    <Menu.Item key={12}>签证</Menu.Item>
                    <Menu.Item key={13}>企业游</Menu.Item>
                    <Menu.Item key={14}>高端游</Menu.Item>
                    <Menu.Item key={15}>爱玩户外</Menu.Item>
                    <Menu.Item key={16}>保险</Menu.Item>
                </Menu>
            </div>
        )
    }   
}

export const Header =  withRouter(HeaderComponent);

