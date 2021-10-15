import React from 'react';
import { BrowserRouter,Route ,Switch} from 'react-router-dom'
import styles from "./App.module.css";
import { DetailPage, HomePage, RegisterPage, SignInPage } from './pages';


function App() {
    return (
        <div className={styles.App}>
           <BrowserRouter>
             <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route path="/signIn" component={SignInPage}></Route>
              <Route path="/register" component={RegisterPage}></Route>
              <Route path="/detail/:touristRouteId" component={DetailPage}></Route>
              <Route render={() => <h1>404 页面不存在</h1>}></Route>
             </Switch>
           </BrowserRouter>
        </div>
    );
}

export default App;
