import axios from "axios";
import {API_URL} from "../utils/constants"
import {  IGetSale, ICreateSale, IUpdateSale } from "../types/sale.types";
import { GetToken } from "../utils/local_data";

export const get_sale = async () => {
    const response = await axios.get<{sales: IGetSale[]}>(`${API_URL}/sale`,{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return response.data
}

export const create_sale = async (sale: ICreateSale) => {
    const response = await axios.post(`${API_URL}/sale`, sale)
    return response.data;
}
export const update_sale = async (id: number, sale: IUpdateSale) => {
    const {data} = await axios.put<{ok: boolean}>(API_URL + '/sale/' + id, sale,{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return data;
}

export const delete_sale = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/sale/" + id,
    { 
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}