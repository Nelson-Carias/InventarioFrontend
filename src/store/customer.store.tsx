
//import  {useState, useEffect} from 'react'
import { create_customer, delete_customer, get_customer, update_customer, get_customer_list} from '../service/customer.service'
//import { IGetCustomer } from '../types/customer.types'
import { IPagination } from "../types/global.types";
import { AxiosError } from "axios";
import {ICustomerStore} from '../types/customer.store.types'
import { create } from "zustand";


export const useCustomerStore = create<ICustomerStore>((set, get) => ({
 
    customer: [],
    pagination_customer: {} as IPagination,
    OnGetCustomer: async (page = 1, limit = 5, name = "") => {
     
      get_customer(page, limit, name)
        .then(({data}) => {
          set({
            customer: data.customer,
            pagination_customer: {
              total: data.total,
              totalPag: data.totalPag,
              currentPag: data.currentPag,
              nextPag: data.nextPag,
              prevPag: data.prevPag,
              // status: data.status,
              ok: data.ok,
            },
          });
        })
        .catch((error) => {
          // ShowErrorAlert(Number(error.response?.data.status));
          console.log(error)
          set({
            customer: [],
            pagination_customer: {
              total: 0,
              totalPag: 0,
              currentPag: 0,
              nextPag: 0,
              prevPag: 0,
              // status: 0,
              ok: false,
            },
          });
        });
    },
  
    OnCreateCustomer(customer) {
      const value = create_customer(customer)
        .then(({ data }) => {
          get().OnGetCustomer(1, 5, "")
          console.log("success", "Registro creado con éxito");
          return data.ok;
        });
      return value;
    },
  
    OnDeleteCustomer(id: number) {
      const value = delete_customer(id)
      .then((response) => {
        get().OnGetCustomer(1, 5, "");
        return response.ok;
      })
      .catch((error: AxiosError<{ status: number }>) => {
        Number(error.response?.data.status);
        return false
      })
      return value;
    },
  
    OnGetCustomerList: async () => {
      get_customer_list().then(({ data }) => {
        set({
          customer: data.customer,
        });
      });
    },
  
    OnUpdateCustomer(id: number, customer) {
      const value = update_customer(id, customer)
        .then((response) => {
          console.log("success", "Proveedor fue actualizado correctamente");
          get().OnGetCustomer(1, 5, "");
          return response.data.ok;
        })
        .catch((error: AxiosError<{ status: number }>) => {
          Number(error.response?.data.status);
          return false;
        });
      return value;
    },
  }));




// const useCustomerStore = () => {
//     const [customer, setCustomer] = useState<IGetCustomer[]>([])
    
//     useEffect(() =>{
//         OnGetCustomer("");
//     }, []);

//     const OnGetCustomer = async (name:string) => {
//         try{
//             const data = await get_customer(name);
//             setCustomer(data.customer);
//         }catch{
//             return({

//             })
//         }
//     };

//     const OnCreateCustomer = async (name: string, lastName:string, direction:string) =>{
        
//         try {
//             const data = await create_customer(name, lastName, direction);
//             if (data.ok){
//                 await OnGetCustomer("");
//             }
//         } catch {
//             return({

//             })
//         }
//     };

//     const OnUpdateCustomer = async (id: number, name: string, lastName:string, direction:string) =>{
//         try{
//             const data = await update_customer(id, name, lastName, direction);

//             if(data.ok){
//                 await OnGetCustomer("");
//             }
//         }catch(error){
//             return({

//             })
//         }
//     };

//     const OnDeleteCustomer = async (id: number) => {
//         try{
//             const data = await delete_customer(id);
//             if (data.ok){
//                 await OnGetCustomer("")
//             }
//         }catch{
//             return({

//             })
//         }
//     }




//     return{
//         customer, 
//         OnGetCustomer, 
//         OnCreateCustomer, 
//         OnUpdateCustomer,
//         OnDeleteCustomer
//     }

// }

// export default useCustomerStore

