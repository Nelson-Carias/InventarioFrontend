import { make_login } from '../service/auth.service'
import { AddToken, RemoveToken } from '../utils/local_data'
import { LoginData } from '../types/auth.types'
import { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { MdOutlineAssignmentReturn } from "react-icons/md";



function isAxiosError(error: unknown): error is AxiosError{
    return(error as AxiosError).isAxiosError !== undefined;
}

export async function MakeLogin(data_send: LoginData){
    try{
        const {data} = await make_login(data_send)
        console.log(data);
        if (data.tokenb){
            AddToken(data.tokenb);
            
            

           

           

            window.location.href = '/home';

            return true;
        }
    }catch(error){
        if (isAxiosError(error)){
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 401){
                
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Las credenciales de inicio de sesión son incorrectas",
                    showConfirmButton: false, 
                    timer: 2000,
                });
            }else{
                console.log("error al Iniciarde sesion ")
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al iniciar sesión",
                    showConfirmButton: false, 
                    timer: 2000,
                });
            }
            return false;
        }
    }
}

function AuthComponent(){
    function MakeLogout(){
        RemoveToken();
        Swal.fire({
            icon: "info",
            title: "Cierre de sesión",
            text: "Ha cerrado sesión exitosamente",
            showConfirmButton: false, 
            timer: 2000,
        });

        window.location.href = '/';
    }
    return (
        <div>
            <button onClick={MakeLogout} className="group flex w-full items-center text-sm  gap-3.5 font-medium   hover:bg-gray-600 rounded-md "> <MdOutlineAssignmentReturn size={34}/>
          
        </button>
            
        </div>
    )
}

export default AuthComponent