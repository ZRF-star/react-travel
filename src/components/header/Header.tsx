import React from "react";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { withRouter,RouteComponentProps } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalOutlined } from "@ant-design/icons";
import { RootState } from '../../redux/store'
import { changeLanguageActionCreator, addLanguageActionCreator } from '../../redux/language/languageActions'
import styles from "./Header.module.css";
import logo from '../../assets/logo.svg';

interface IHeaderProps {}

type State = ReturnType<typeof mapStateToProps>
type Props = IHeaderProps & RouteComponentProps & WithTranslation & State &
             ReturnType<typeof mapDispatchToProps>;

export class HeaderComponent extends React.Component<Props> {
    
    private handleMenuClick = (e) => {
        if(e.key === "new") {
            console.log(e.key);
            this.props.addLanguage("新语言","new_lang");
        } else {
            this.props.changeLanguage(e.key);
        }
    }

    render() {
        const { history, t } = this.props;
        return (
            <div className={styles['app-header']}>
                {/* top-header */}
                <div className={styles['top-header']}>
                    <div className={styles.inner}>
                        <Typography.Text>{t("header.slogan")}</Typography.Text>
                        <Dropdown.Button
                            style={{ marginLeft: 15 }}
                            overlay={
                                <Menu onClick={this.handleMenuClick}>
                                    {this.props.languageList.map(item => {
                                        return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                                    })}
                                    <Menu.Item key={"new"}>添加语言</Menu.Item>
                                </Menu>
                            }
                            icon={<GlobalOutlined />}
                        >
                            {this.props.language === "zh" ? "中文" : "English"}
                        </Dropdown.Button>
                        <Button.Group className={styles['botton-group']}>
                            <Button onClick={() => history.push('register')}>{t("header.register")}</Button>
                            <Button onClick={() => history.push('signIn')}>{t("header.signin")}</Button>
                        </Button.Group>
                    </div>
                </div>
                <Layout.Header className={styles['main-header']}>
                    <span onClick={() => history.push('/')}>
                        <img src={logo} alt="logo" className={styles['App-logo']} />
                        <Typography.Title level={3} className={styles.title}></Typography.Title>
                    </span>
               
                    <Input.Search className={styles['search-input']}
                        placeholder={'请输入旅游目的地、主题、或关键字'}
                        onSearch={(keywords) => history.push("/search/" + keywords)}
                    />
                </Layout.Header>
                <Menu mode={"horizontal"} className={styles['main-menu']}>
                    <Menu.Item key="1">{t("header.home_page")}</Menu.Item>
                    <Menu.Item key="2">{t("header.weekend")}</Menu.Item>
                    <Menu.Item key="3">{t("header.group")}</Menu.Item>
                    <Menu.Item key="4">{t("header.backpack")}</Menu.Item>
                    <Menu.Item key="5">{t("header.private")}</Menu.Item>
                    <Menu.Item key="6">{t("header.cruise")}</Menu.Item>
                    <Menu.Item key="7">{t("header.hotel")}</Menu.Item>
                    <Menu.Item key="8">{t("header.local")}</Menu.Item>
                    <Menu.Item key="9">{t("header.theme")}</Menu.Item>
                    <Menu.Item key="10">{t("header.custom")}</Menu.Item>
                    <Menu.Item key="11">{t("header.study")}</Menu.Item>
                    <Menu.Item key="12">{t("header.visa")}</Menu.Item>
                    <Menu.Item key="13">{t("header.enterprise")}</Menu.Item>
                    <Menu.Item key="14">{t("header.high_end")}</Menu.Item>
                    <Menu.Item key="15">{t("header.outdoor")}</Menu.Item>
                    <Menu.Item key="16">{t("header.insurance")}</Menu.Item>
                </Menu>
            </div>
        )
    }   
}

function mapStateToProps(state:RootState) {
    return {
        language: state.language.language,
        languageList: state.language.languageList,
    };
}
function mapDispatchToProps(dispatch:Dispatch) {
    return {
        changeLanguage:(code:"zh" | "en") => {
            const action = changeLanguageActionCreator(code);
            dispatch(action);
        },
        addLanguage:(name:string, code:string) => {
            const action = addLanguageActionCreator(name, code);
            dispatch(action);
        },
    };
}
export const Header =  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));

