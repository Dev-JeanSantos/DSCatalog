import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import makeRequest, { makePrivateRequest } from 'core/utils/request';
import ProductInfoLoader from 'pages/Catalog/Components/Loaders/ProductInfoLoader';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import './styles.scss';

const List = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handCreate = () => {
        history.push('products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja excluir realmente esse produto?');

        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Produto removido com sucesso!');
                    history.push('/admin/products');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao remover o produto!');
                })
        }

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
                            <Card product={product} key={product.id} onRemove={onRemove} />
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