import axios from 'axios'
import { ICreateUser, IGetUser, IUpdateUser } from '../types/user.types'
import { API_URL } from '../utils/constants'
import { GetToken } from '../utils/local_data'

export const create_user = async (user: ICreateUser) => {
    const response = await axios.post(`${API_URL}/user`, user, {
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return response.data;
}

export const get_users = async () => {
    const response = await axios.get<{users: IGetUser[]}>(`${API_URL}/user`,{
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })
    return response.data
}

export const update_user = async (id: number, user: IUpdateUser) => {
    const {data} = await axios.put<{ok: boolean}>(API_URL + '/user' + id, user)
    return data;
}

export const delete_user = async (id: number) => {
    const response = await axios.delete(`${API_URL}/user/${id}`)
    return response.data
}