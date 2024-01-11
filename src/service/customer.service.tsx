import axios from "axios";
import {API_URL} from "../utils/constants"
import {   IGetCustomerPaginated, ICreateCustomer, IUpdateCustomer } from "../types/customer.types";
import { GetToken } from "../utils/local_data";

export const get_customer = async (page = 1, limit = 5, name = "") => {
    return axios.get<IGetCustomerPaginated>(
      `${API_URL}/customer?page=${page}&limit=${limit}&name=${name}`, {
          headers:{
              Authorization: "Bearer " + GetToken()
          }
      }
    ); 
  };

  export const create_customer = async (customerStatus: ICreateCustomer) => {
    return axios.post<IGetCustomerPaginated>(`${API_URL}/customer`, customerStatus, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };
  export const update_customer = (id: number, customer: IUpdateCustomer) => {
    return axios.put<IGetCustomerPaginated>(`${API_URL}/customer/` + id, customer, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };    
  export const get_customer_list = async () => {
    return await axios.get<IGetCustomerPaginated>(`${API_URL}/customer`, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };
export const delete_customer = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/customer/" + id,
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}