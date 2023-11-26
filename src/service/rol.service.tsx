import axios from "axios";
import {API_URL} from "../utils/constants"
import {  IGetRoles } from "../types/rol.types";

export const get_roles = async () => {
    const {data} = await axios.get<{roles: IGetRoles[]}>(API_URL + "/rol")

    return data
}

export const create_rol = async (rol: string)=> {
    const {data} = await axios.post<{ok:boolean, msg: string}>(API_URL +"/rol", {rol,})

    return data
}

export const update_rol = async (id: number, rol: string) => {
    const {data} = await axios.put<{ok:boolean, msg: string}>(API_URL + "/rol/" + id, {rol, },)

    return data
}

export const delete_rol = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/rol/" + id,)

    return data
}