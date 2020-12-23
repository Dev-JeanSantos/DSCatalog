import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Catalog from '..';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { productResponse } from './fixtures';

const server = setupServer(
    rest.get('http://localhost:8080/products', (req, res, ctx) => {
      return res(ctx.json(productResponse))
    })
  );
    
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())


test('should render Catalog', async () => {


    render(
       <Router history={ history }>
            <Catalog/>
        </Router>
    );

    expect(screen.getAllByTitle('Loading...')).toHaveLength(5);
    expect(screen.getByText('Catálogo de Produtos')).toBeInTheDocument();
    
    await waitFor(() => expect(screen.getByText('PC Gamer')).toBeInTheDocument());
 
    expect(screen.queryAllByTitle('Loading...')).toHaveLength(0);

});