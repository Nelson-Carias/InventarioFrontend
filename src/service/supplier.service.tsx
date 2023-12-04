import axios from "axios";
import {API_URL} from "../utils/constants"
import {  IGetSuppliers } from "../types/supplier.types";
import { GetToken } from "../utils/local_data";

export const get_supplier = async () => {
    const {data} = await axios.get<{supplier: IGetSuppliers[]}>(API_URL + "/supplier",
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}

export const create_supplier = async (name: string, contact:string, direction:string)=> {
    const {data} = await axios.post<{ok:boolean, msg: string}>(API_URL +"/supplier", {name, contact, direction},{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}
export const update_supplier = async (id: number, name: string, contact:string, direction:string) => {
    const {data} = await axios.put<{ok:boolean, msg: string}>(API_URL + "/supplier/" + id, {name, contact, direction },{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}

export const delete_supplier = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/supplier/" + id,{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}