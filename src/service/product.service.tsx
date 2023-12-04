import axios from 'axios'
import { API_URL } from '../utils/constants'
import { IGetProducts, ICreateProduct, IUpdateProduct  } from '../types/product.types'
import { GetToken } from '../utils/local_data'

export const create_product = async (product : ICreateProduct) =>{
    const response = await axios.post(`${API_URL}/product`, product,
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return response.data;
}

export const get_products = async () => {
    const response = await axios.get<{products: IGetProducts[]}>(`${API_URL}/product`, 
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return response.data
}

export const update_product = async (id: number, product: IUpdateProduct) => {
    const {data} = await axios.put<{ok: boolean}>(API_URL + "/product/" + id, product, 
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return data;
}

export const delete_product = async (id: number) => {
    const response = await axios.delete(`${API_URL}/product/${id}`, 
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return response.data
}





