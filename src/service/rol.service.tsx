import axios from "axios";
import {API_URL} from "../utils/constants"
import {  ICreateRol, IGetRolesResponse } from "../types/rol.types";

export const get_roles = (name:string, ) => {
    return axios.get<IGetRolesResponse>(API_URL + "/rol?"+ name)
}

export const create_rol = async (rol: ICreateRol)=> {
    return axios.post<{ok:boolean, msg: string}>(API_URL +"/rol", rol)
}