import { make_login } from '../service/auth.service'
import { AddToken, RemoveToken } from '../utils/local_data'
import { LoginData } from '../types/auth.types'
import { AxiosError } from 'axios'
import Swal from 'sweetalert2'



function isAxiosError(error: unknown): error is AxiosError{
    return(error as AxiosError).isAxiosError !== undefined;
}

export async function MakeLogin(data_send: LoginData){
    try{
        const {data} = await make_login(data_send)
        console.log(data);
        if (data.tokenb){
            AddToken(data.tokenb);
            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                text: "¡Bienvenido!",
                showConfirmButton: false, 
                timer: 2000,
            })

           

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
                    timer: 9000,
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
    }
    return (
        <div>
            <button onClick={MakeLogout}>Cerrar sesión</button>
        </div>
    )
}

export default AuthComponent
