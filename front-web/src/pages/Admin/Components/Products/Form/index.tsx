import React, { useEffect, useState } from 'react';
import makeRequest, { makePrivateRequest } from 'core/utils/request';
import { useForm, Controller} from 'react-hook-form';
import Select from 'react-select';
import {toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import { Category } from 'core/types/Product';

type FormState = {
    name: string;
    price: string;
    imgUrl: string;
    description: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {

    const { register, handleSubmit, errors, setValue, control} = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
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
            setValue('categories', response.data.categories);
        })
     }            
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url:'/categories'})
        .then(response => setCategories(response.data.content))
        .finally(() => setIsLoadingCategories(false));
    }, []);
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
                                data-testid="name"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                        <label htmlFor="categories" className="d-none">Categorias</label>
                         <Controller
                            as={Select} 
                            name="categories"
                            rules={{ required:true}}                            
                            control={control}
                            options={categories} 
                            isLoading={isLoadingCategories}
                            getOptionLabel={(option: Category) => option.name}
                            getOptionValue={(option: Category) => String(option.id)}
                            isMulti
                            classNamePrefix="categories-select"
                            placeholder="Categorias"
                            inputId="categories"
                            defaultValue=""
                          />
                          {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo Obrigatório
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
                                data-testid="price"
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
                                data-testid="imgUrl"
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
                            data-testid="description"
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