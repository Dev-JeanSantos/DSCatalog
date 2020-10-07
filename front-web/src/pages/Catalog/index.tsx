import React from 'react';
import ProductsCard from './Components/ProductsCard';
import './styles.scss'

const  Catalog= () =>(
    <div className="catalog-container">
        <h1 className="catalog-title">
            Catálogo de Produtos
        </h1>
        <div className="catalog-produtcs">
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
           <ProductsCard/>
        </div>
    </div>
);

export default Catalog;