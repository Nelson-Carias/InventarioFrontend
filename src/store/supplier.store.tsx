
import  {useState, useEffect} from 'react'
import { create_supplier, delete_supplier, get_supplier, update_supplier  } from '../service/supplier.service'
import { IGetSuppliers } from '../types/supplier.types'

const useSupplierStore = () => {
    const [supplier, setSupplier] = useState<IGetSuppliers[]>([])
    
    useEffect(() =>{
        OnGetSupplier();
    }, []);

    const OnGetSupplier = async () => {
        try{
            const data = await get_supplier();
            setSupplier(data.supplier);
        }catch{
            return({

            })
        }
    };

    const OnCreateSupplier = async (name: string, contact:string, direction:string) =>{
        
        try {
            const data = await create_supplier(name, contact, direction);
            if (data.ok){
                await OnGetSupplier();
            }
        } catch {
            return({

            })
        }
    };

    const OnUpdateSupplier = async (id: number, name: string, contact:string, direction:string) =>{
        try{
            const data = await update_supplier(id, name, contact, direction);

            if(data.ok){
                await OnGetSupplier();
            }
        }catch(error){
            return({

            })
        }
    };

    const OnDeleteSupplier = async (id: number) => {
        try{
            const data = await delete_supplier(id);
            if (data.ok){
                await OnGetSupplier()
            }
        }catch{
            return({

            })
        }
    }




    return{
        supplier, 
        OnGetSupplier, 
        OnCreateSupplier, 
        OnUpdateSupplier,
        OnDeleteSupplier
    }

}

export default useSupplierStore