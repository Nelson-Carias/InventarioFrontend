import  {useState, useEffect} from 'react'
import { create_rol, delete_rol, get_roles, update_rol  } from '../service/rol.service'
import { IGetRoles } from '../types/rol.types'

const useRoleStore = () => {
    const [roles, setRoles] = useState<IGetRoles[]>([])
    
    useEffect(() =>{
<<<<<<< HEAD
        OnGetRoles();
        
=======
        OnGetRoles("");
>>>>>>> 85b3a65e64e72eaebfca5ebfd131313f27cfe031
    }, []);

    const OnGetRoles = async (name: string) => {
        try{
            const data = await get_roles(name);
            setRoles(data.roles);
        }catch{
            return({

            })
        }
    };

    const OnCreateRol = async (rol: string) =>{
        
        try {
            const data = await create_rol(rol);
            if (data.ok){
                await OnGetRoles("");
            }
        } catch {
            return({

            })
        }
    };

    const OnUpdateRol = async (id: number, rol: string) =>{
        try{
            const data = await update_rol(id, rol);

            if(data.ok){
                await OnGetRoles("");
            }
        }catch(error){
            return({

            })
        }
    };

    const OnDeleteRol = async (id: number) => {
        try{
            const data = await delete_rol(id);
            if (data.ok){
                await OnGetRoles("")
            }
        }catch{
            return({

            })
        }
    }




    return{
        roles, 
        OnGetRoles, 
        OnCreateRol, 
        OnUpdateRol,
        OnDeleteRol
    }

}

export default useRoleStore