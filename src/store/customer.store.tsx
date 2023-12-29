
import  {useState, useEffect} from 'react'
import { create_customer, delete_customer, get_customer, update_customer  } from '../service/customer.service'
import { IGetCustomer } from '../types/customer.types'

const useCustomerStore = () => {
    const [customer, setCustomer] = useState<IGetCustomer[]>([])
    
    useEffect(() =>{
        OnGetCustomer("");
    }, []);

    const OnGetCustomer = async (name:string) => {
        try{
            const data = await get_customer(name);
            setCustomer(data.customer);
        }catch{
            return({

            })
        }
    };

    const OnCreateCustomer = async (name: string, lastName:string, direction:string) =>{
        
        try {
            const data = await create_customer(name, lastName, direction);
            if (data.ok){
                await OnGetCustomer("");
            }
        } catch {
            return({

            })
        }
    };

    const OnUpdateCustomer = async (id: number, name: string, lastName:string, direction:string) =>{
        try{
            const data = await update_customer(id, name, lastName, direction);

            if(data.ok){
                await OnGetCustomer("");
            }
        }catch(error){
            return({

            })
        }
    };

    const OnDeleteCustomer = async (id: number) => {
        try{
            const data = await delete_customer(id);
            if (data.ok){
                await OnGetCustomer("")
            }
        }catch{
            return({

            })
        }
    }




    return{
        customer, 
        OnGetCustomer, 
        OnCreateCustomer, 
        OnUpdateCustomer,
        OnDeleteCustomer
    }

}

export default useCustomerStore