import React from 'react';
import { render, screen} from '@testing-library/react';
import ProductPrice from '..';

test('should render ProductPrice', () => {

    //Arrange
    const price = 1200;

    //Action
    render(
        <ProductPrice price={price}/>
    );

    //Assert
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('1,200.00');
    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});

test('should render ProductPrice whith price equals zero', () => {
    
    const price = 0;
    render(
        <ProductPrice price={price}/>
    );

    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('0.00');
    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});
test('should render ProductPrice whithout thousand separator', () => {
    
    const price = 100;
    render(
        <ProductPrice price={price}/>
    );

    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('100.00');
    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});