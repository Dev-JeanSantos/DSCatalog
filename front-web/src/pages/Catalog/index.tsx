import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { ProductsResponse } from 'core/types/Product';
import makeRequest from 'core/utils/request';
import ProductCatalogLoad from './Components/Loaders/ProductCatalogLoad';
import ProductsCard from './Components/ProductsCard';
import './styles.scss'
import Pagination from 'core/components/Pagination';

const Catalog = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage ] = useState(0);




    //PASSO 2 
    useEffect(() => {


        //PASSO 6 PARAMENTROS QUE REFINAM A BUSCA
        const params = {
            page: activePage,
            linesPerPage: 10
        }

        //PASSO 5 INTEGRAÇÃO DO AXIOS ATRAVES DE UM OBJETO EXPORTADO
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(()=> {
                setIsLoading(false);
            })

    }, [activePage]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de Produtos
            </h1>
            <div className="catalog-produtcs">
                {isLoadind ? <ProductCatalogLoad/> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductsCard product={product} />
                        </Link>
                    ))
                )}
            </div>
            {productsResponse && 
                <Pagination 
                totalPages={productsResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                
                />}
        </div>
    );
};

export default Catalog;