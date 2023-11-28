import axios from "axios";
import {API_URL} from "../utils/constants"
import {  IGetSuppliers } from "../types/supplier.types";

export const get_supplier = async () => {
    const {data} = await axios.get<{supplier: IGetSuppliers[]}>(API_URL + "/supplier")

    return data
}

export const create_supplier = async (name: string, contact:number, direction:string)=> {
    const {data} = await axios.post<{ok:boolean, msg: string}>(API_URL +"/supplier", {name, contact, direction})

    return data
}
export const update_supplier = async (id: number, name: string, contact:number, direction:string) => {
    const {data} = await axios.put<{ok:boolean, msg: string}>(API_URL + "/supplier/" + id, {name, contact, direction },)

    return data
}

export const delete_supplier = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/supplier/" + id,)

    return data
}