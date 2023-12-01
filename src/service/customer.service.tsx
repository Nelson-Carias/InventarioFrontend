import axios from "axios";
import {API_URL} from "../utils/constants"
import {  IGetCustomer } from "../types/customer.types";
import { GetToken } from "../utils/local_data";

export const get_customer = async () => {
    const {data} = await axios.get<{customer: IGetCustomer[]}>(API_URL + "/customer",
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}

export const create_customer = async (name: string, lastName:string, direction:string)=> {
    const {data} = await axios.post<{ok:boolean, msg: string}>(API_URL +"/customer", {name, lastName, direction },{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    }
    )
    
    return data
}
export const update_customer = async (id: number, name: string, lastName:string, direction:string) => {
    const {data} = await axios.put<{ok:boolean, msg: string}>(API_URL + "/customer/" + id, {name, lastName, direction},{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}

export const delete_customer = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/customer/" + id,
    {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}