import React, { useEffect } from 'react';
import makeRequest, { makePrivateRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';

type FormState = {
    name: string;
    price: string;
    imgUrl: string;
    description: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {

    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar Produto' : 'Cadastrar Produto';

    useEffect(() => {
     if (isEditing){
        makeRequest({ url: `/products/${productId}` })
        .then(response => {
            setValue('name', response.data.name);
            setValue('price', response.data.price);
            setValue('imgUrl', response.data.imgUrl);
            setValue('description', response.data.description);
        })
     }            
    }, [productId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
  
        makePrivateRequest({ 
            url: isEditing ? `/products/${productId}` : '/products', 
            method: isEditing ? 'PUT' : 'POST', 
            data 
        })
        .then(() => {           
            toast.info('Produto salvo com sucesso!');
            history.push('/admin/products');
        })
        .catch(() => {
            toast.error('Erro ao salvar o produto!');
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
            title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className=" margin-bottom-30 ">
                            <input
                                ref={register({ 
                                    required: "Campo Obrigatório",
                                    minLength:{value:5, message: 'O campo deve ter no mínimo 5 caracteres'},
                                    maxLength:{value:60, message: 'O campo deve ter no máximo 60 caracteres'}
                                })}
                                name="name"
                                type="text"
                                className="form-control mt-3 input-base"
                                placeholder="Nome do Produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo Obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control  input-base"
                                placeholder="Preço"
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo Obrigatório" })}
                                name="imgUrl"
                                type="text"
                                className="form-control mt-3 input-base"
                                placeholder="Imagem do produto"
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea className="form-control input-base"
                            ref={register({ required: "Campo Obrigatório" })}
                            placeholder="Descrição"
                            name="description"
                            cols={30}
                            rows={10}
                        />
                        {errors.description&& (
                                <div className="invalid-feedback d-block">
                                    {errors.description.message}
                                </div>
                            )}
                    </div>
                </div>
            </BaseForm>
        </form>

    );
};
export default Form;