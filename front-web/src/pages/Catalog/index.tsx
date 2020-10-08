import React from 'react';
import {Link} from 'react-router-dom'
import ProductsCard from './Components/ProductsCard';
import './styles.scss'

const  Catalog= () =>(
    <div className="catalog-container">
        <h1 className="catalog-title">
            Catálogo de Produtos
        </h1>
        <div className="catalog-produtcs">
           <Link to="/products/1"> <ProductsCard/></Link>
           <Link to="/products/2"> <ProductsCard/></Link>
           <Link to="/products/3"> <ProductsCard/></Link>
           <Link to="/products/4"> <ProductsCard/></Link>
           <Link to="/products/5"> <ProductsCard/></Link>
           <Link to="/products/6"> <ProductsCard/></Link>
           <Link to="/products/7"> <ProductsCard/></Link>
           <Link to="/products/8"> <ProductsCard/></Link>
           <Link to="/products/9"> <ProductsCard/></Link>
           <Link to="/products/10"> <ProductsCard/></Link>
           <Link to="/products/11"> <ProductsCard/></Link>
           <Link to="/products/12"> <ProductsCard/></Link>
           <Link to="/products/13"> <ProductsCard/></Link>
           <Link to="/products/14"> <ProductsCard/></Link>           
        </div>
    </div>
);

export default Catalog;