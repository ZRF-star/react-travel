import React, { useEffect } from 'react';
import { BrowserRouter,Route ,Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from './redux/hooks';
import styles from "./App.module.css";
import { DetailPage, HomePage, RegisterPage, SignInPage, SearchPage, ShoppingCart,PlaceOrderPage } from './pages';
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent  = (props) => {
    return (isAuthenticated ? (
      React.createElement(component, props)
    ):(
      <Redirect to={{pathname:"/signIn"}}/>
    )
    )
  }
  return <Route render={routeComponent} {...rest}/>
}

function App() {
    const jwt = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
      if(jwt) {
        dispatch(getShoppingCart(jwt));
      }
    },[jwt]);

    return (
        <div className={styles.App}>
           <BrowserRouter>
             <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route path="/signIn" component={SignInPage}></Route>
              <Route path="/register" component={RegisterPage}></Route>
              <Route path="/detail/:touristRouteId" component={DetailPage}></Route>
              <Route path="/search/:keywords" component={SearchPage}></Route>
              <PrivateRoute 
              isAuthenticated={jwt !== null}
              path="/shoppingCart" 
              component={ShoppingCart}>
              </PrivateRoute>
              <PrivateRoute
              isAuthenticated={jwt !== null}
              path="/placeOrder"
              component={PlaceOrderPage}
              />
              <Route render={() => <h1>404 页面不存在</h1>}></Route>
             </Switch>
           </BrowserRouter>
        </div>
    );
}

export default App;
