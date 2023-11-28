import axios from 'axios'
import { API_URL } from '../utils/constants'
import { LoginData, Response } from '../types/auth.types'

import { RemoveToken } from '../utils/local_data'
import { useNavigate } from 'react-router-dom'

export async function make_login(values : LoginData){
    const data = await axios.post<Response>(API_URL + "/login/sign", values)
    return data
}


export function log_out() {
    RemoveToken();
    
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const navigate = useNavigate();
        navigate('/');
 
}



