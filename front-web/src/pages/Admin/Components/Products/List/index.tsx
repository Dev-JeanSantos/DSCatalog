import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import makeRequest from 'core/utils/request';
import ProductInfoLoader from 'pages/Catalog/Components/Loaders/ProductInfoLoader';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import './styles.scss';
const List = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    useEffect(() => {
        
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    const handCreate = () => {
        history.push('products/create');
    }

    return (
        <div className="admin-products-list">
            {isLoadind ? <ProductInfoLoader /> : (
                <>
                    <button className="btn btn-primary btn-lg" onClick={handCreate}>
                        ADICIONAR
                    </button>
                    <div className="admin-list-container">
                        {productsResponse?.content.map(product => (
                            <Card product={product} key={product.id} />
                        ))}
                        {productsResponse &&
                            <Pagination
                                totalPages={productsResponse.totalPages}
                                activePage={activePage}
                                onChange={page => setActivePage(page)}
                            />}
                    </div>
                </>
            )}
        </div>
    );
};

export default List;