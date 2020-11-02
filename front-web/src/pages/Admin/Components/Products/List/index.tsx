import React from 'react';
import { useHistory } from 'react-router-dom';
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
        </div>
    );
};

export default List;