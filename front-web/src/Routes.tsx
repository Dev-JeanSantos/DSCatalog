import Auth from 'pages/Auth';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductsDetails from './pages/Catalog/Components/ProductDetails';
import Home from './pages/Home';

const Routes = () =>(
    
    <BrowserRouter>
        <Navbar/>
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Route path="/products" exact>
                <Catalog/>
            </Route>
            <Route path="/products/:productsId">
                <ProductsDetails/>
            </Route>
            <Redirect from="/admin/auth" to="/admin/auth/login" exact />
            <Route path="/admin/Auth">
                <Auth/>
            </Route>
            <Redirect from="/admin" to="/admin/products" exact />
            <Route path="/admin">
                <Admin/>
            </Route>
        </Switch>
    </BrowserRouter>
)

export default Routes;