import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';
import ProductsCard from '../ProductsCard';
import { Product } from 'core/types/Product';


test('should render ProductCard', () => {

    const product = {
        name: 'computador',
        imgUrl: 'image.jpg',
        price:40
    } as Product;

    render(
        
        <Router history={history}>
            <ProductsCard product={product} />
        </Router>
    );
    
    //screen.debug();
    expect(screen.getByText('computador')).toBeInTheDocument();
    expect(screen.getByAltText('computador')).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('40.00')).toBeInTheDocument();
});