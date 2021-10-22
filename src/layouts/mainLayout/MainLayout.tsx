import React from 'react';
import styles from './MainLayout.module.css';
import { Header, Footer } from '../../components';

export const MainLayout:React.FC = (props) => {
    const { children } = props;
    return (
        <>
          <Header />
          {/* 页面的内容 content */}
          <div className={styles['page-content']}>
              {children}
          </div>
          <Footer />
        </>
    )
}