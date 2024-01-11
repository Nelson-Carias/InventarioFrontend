import axios from "axios";
import {API_URL} from "../utils/constants"
import {  ICreateSupplier,  IGetSuppliersPaginated, IUpdateSupplier } from "../types/supplier.types";
import { GetToken } from "../utils/local_data";

export const get_supplier = async (page = 1, limit = 5, name = "") => {
    return axios.get<IGetSuppliersPaginated>(
      `${API_URL}/supplier?page=${page}&limit=${limit}&name=${name}`, {
          headers:{
              Authorization: "Bearer " + GetToken()
          }
      }
    );
  };
  export const create_supplier = async (supplierStatus: ICreateSupplier) => {
    return axios.post<IGetSuppliersPaginated>(`${API_URL}/supplier`, supplierStatus, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };
  export const update_supplier = (id: number, supplier: IUpdateSupplier) => {
    return axios.put<IGetSuppliersPaginated>(`${API_URL}/supplier/` + id, supplier, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };
  

export const get_suppliers_list = async () => {
    return await axios.get<IGetSuppliersPaginated>(`${API_URL}/supplier`, {
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  };

export const delete_supplier = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/supplier/" + id,{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}