import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price:string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement | HTMLSelectElement>

const Form = () => {

    const [formData, setFormData] = useState <FormState> ({
        name: '',
        price: '',
        category: '',
        description:''
    });
    

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name
        const value = event.target.value
        
        setFormData(data => ({...data, [name]: value}));
    }
  

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        const payload = {
            ...formData,
            imgUrl: 'https://img.olx.com.br/images/69/693010582754414.jpg',
            categories: [{id: formData.category}]
        }
        
        makePrivateRequest({url: '/products', method: 'POST', data: payload });
        console.log(payload);
    }

    return (

        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5 mt-3"
                            onChange={handleOnChange}
                            placeholder="Nome do Produto"
                        />
                        <select 
                        name="category"
                        value={formData.category}
                        className="form-control mb-5" 
                        onChange={handleOnChange}>
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                        </select>
                        <input
                            name="price"
                            value={formData.price}
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className="col-6">
                        <textarea className="form-control"
                        value={formData.description}
                        name="description" 
                        onChange={handleOnChange}
                        id="" 
                        cols={30}
                        rows={10}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>

    );
};
export default Form;