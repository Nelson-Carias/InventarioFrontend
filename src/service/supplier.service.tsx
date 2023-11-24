import axios from "axios";
import {API_URL} from "../utils/constants"
import {  ICreateSupplier, IGetSuppliersResponse } from "../types/supplier.types";

export const get_suppliers = (name:string, contact:number, direction:string) => {
    return axios.get<IGetSuppliersResponse>(API_URL + "/supplier?"+ name + contact + direction)
}

export const create_supplier = async (supplier: ICreateSupplier)=> {
    return axios.post<{ok:boolean, msg: string}>(API_URL +"/supplier", supplier)
}