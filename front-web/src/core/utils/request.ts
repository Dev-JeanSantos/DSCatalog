import axios, { Method } from 'axios';

//PASSO 3 - CRIAÇÃO DOS PARAMETROS QUE ATENDEM O OBJETO
type RequestParams = {
    method?: Method;
    url: string;
    data?:object;
    params?: object;
}

const BASE_URL = "http://localhost:3000";
//PASSO 4 - CRIAÇÃO DO OBJETO
export const makeRequest = ({method = 'GET', url, data,params}:RequestParams) =>{
    return axios ({   
        method,
        url:`${BASE_URL}${url}`,
        data, 
        params
    });
};

export default makeRequest;