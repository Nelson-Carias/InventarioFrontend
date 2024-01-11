import axios from 'axios'
import { API_URL } from '../utils/constants'
import { ICreateProduct, IUpdateProduct, IGetProductsPaginated  } from '../types/product.types'
import { GetToken } from '../utils/local_data'



export const get_product = async (page = 1, limit = 5, name = "") => {

 
    return axios.get<IGetProductsPaginated>(
      `${API_URL}/product?page=${page}&limit=${limit}&name=${name}`, {
          headers:{
              Authorization: "Bearer " + GetToken()
          }
      }
    );
  


    
    
  };
  export const create_product = async (productStatus: ICreateProduct) => {
    return axios.post<IGetProductsPaginated>(`${API_URL}/product`, productStatus, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };
  export const update_product = (id: number, product: IUpdateProduct) => {
    return axios.put<IGetProductsPaginated>(`${API_URL}/product/` + id, product, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };
  export const get_product_list = async () => {
    return await axios.get<IGetProductsPaginated>(`${API_URL}/product`, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };
export const delete_product = async (id: number) => {
    const response = await axios.delete(`${API_URL}/product/${id}`, 
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return response.data
}





