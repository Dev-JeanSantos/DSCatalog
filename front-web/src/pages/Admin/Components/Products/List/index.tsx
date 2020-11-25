import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import './styles.scss';
const List = () => {
   
    const history = useHistory();

    const handCreate = () =>{
        history.push('products/create');
    }
   
    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
                <Card/>
                <Card/>
                <Card/>
                
            </div>
        </div>
    );
};

export default List;