import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Product';
import makeRequest from 'core/utils/request';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';
import './styles.scss';

type ParamsType = {
    productsId: string;
}

const ProductsDetails = () => {

    const { productsId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoadind, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        makeRequest({ url: `/products/${productsId}` })
            .then(response => setProduct(response.data))
            .finally(() => setIsLoading(false));
    }, [productsId]);

    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">
                        voltar
                    </h1>
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        {isLoadind ? <ProductInfoLoader /> :(
                            <>
                                <div className="product-details-card text-center">
                                    <img src={product?.imgUrl} alt={product?.name} className="product-details-image" />
                                </div>
                                <h1 className="product-details-name">
                                    {product?.name}
                                </h1>
                                {product?.price && <ProductPrice price={product?.price} />}
                            </>
                        )}

                    </div>
                    <div className="col-6 product-details-card">
                        {isLoadind ? <ProductDescriptionLoader /> : (
                            <>
                                <h1 className="product-description-title">Descrição do Produto</h1>
                                <p className="product-description-text">
                                    {product?.description}
                                </p>
                            </>
                        )}
                                           </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;