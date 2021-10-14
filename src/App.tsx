import React from 'react';
import { BrowserRouter,Route ,Switch} from 'react-router-dom'
import styles from "./App.module.css";
import { HomePage } from './pages';


function App() {
    return (
        <div className={styles.App}>
           <BrowserRouter>
             <Switch>
             <Route exact path="/" component={HomePage}></Route>
              <Route path="/signIn" render={() => <h1>登陆页面</h1>}></Route>
             </Switch>
           </BrowserRouter>
        </div>
    );
}

export default App;
