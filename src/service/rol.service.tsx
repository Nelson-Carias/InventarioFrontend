import axios from "axios";
import { API_URL } from "../utils/constants";
import { IGetRolPaginated, IUpdateRol, ICreateRol } from "../types/rol.types";
import { GetToken } from "../utils/local_data";

export const create_roles = async (roleStatus: ICreateRol) => {
  return axios.post<IGetRolPaginated>(`${API_URL}/rol`, roleStatus, {
    headers:{
        Authorization: "Bearer " + GetToken()
    }
});
};

export const get_roles = async (page = 1, limit = 5, name = "") => {
  return axios.get<IGetRolPaginated>(
    `${API_URL}/rol?page=${page}&limit=${limit}&name=${name}`, {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    }
  );
};

export const update_roles = (id: number, rol: IUpdateRol) => {
  return axios.put<IGetRolPaginated>(`${API_URL}/rol/` + id, rol, {
    headers:{
        Authorization: "Bearer " + GetToken()
    }
});
};

export const get_roles_list = async () => {
  return await axios.get<IGetRolPaginated>(`${API_URL}/roles`, {
    headers:{
        Authorization: "Bearer " + GetToken()
    }
});
};

export const delete_roles = async (id: number) => {
  const { data } = await axios.delete<IGetRolPaginated>(
    `${API_URL}/rol/` + id,{
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  });
  return data;
};