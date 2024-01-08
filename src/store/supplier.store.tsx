
//import  {useState, useEffect} from 'react'
import { create_supplier, delete_supplier, get_supplier, update_supplier, get_suppliers_list  } from '../service/supplier.service'
//import { IGetSuppliers } from '../types/supplier.types'
import { AxiosError } from "axios";
import { ISupplierStore } from '../types/supplier.store.types';
import { create } from "zustand";
import { IPagination } from "../types/global.types";

// const useSupplierStore = () => {
//     suppliers:[],
//     const [supplier, setSupplier] = useState<IGetSuppliers[]>([])
    
//     useEffect(() =>{
//         OnGetSupplier("");
//     }, []);

//     const OnGetSupplier = async (name: string) => {
//         try{
//             const data = await get_supplier(name);
//             setSupplier(data.supplier);
//         }catch{
//             return({

//             })
//         }
//     };

//     const OnCreateSupplier = async (name: string, contact:string, direction:string) =>{
        
//         try {
//             const data = await create_supplier(name, contact, direction);
//             if (data.ok){
//                 await OnGetSupplier("");
//             }
//         } catch {
//             return({

//             })
//         }
//     };

    

//     const OnUpdateSupplier = async (id: number, name: string, contact:string, direction:string) =>{
//         try{
//             const data = await update_supplier(id, name, contact, direction);

//             if(data.ok){
//                 await OnGetSupplier("");
//             }
//         }catch(error){
//             return({

//             })
//         }
//     };

//     const OnDeleteSupplier = async (id: number) => {
//         try{
//             const data = await delete_supplier(id);
//             if (data.ok){
//                 await OnGetSupplier("")
//             }
//         }catch{
//             return({

//             })
//         }
//     }




//     return{
//         supplier, 
//         OnGetSupplier, 
//         OnCreateSupplier, 
//         OnUpdateSupplier,
//         OnDeleteSupplier
//     }

// }

// export default useSupplierStore

export const useSupplierStore = create<ISupplierStore>((set, get) => ({
    supplier: [],
    pagination_supplier: {} as IPagination,
    OnGetSuppliers: async (page = 1, limit = 5, name = "") => {
      get_supplier(page, limit, name)
        .then(({data}) => {
          set({
            supplier: data.supplier,
            pagination_supplier: {
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
            supplier: [],
            pagination_supplier: {
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
  
    OnCreateSupplier(supplier) {
      const value = create_supplier(supplier)
        .then(({ data }) => {
          get().OnGetSuppliers(1, 5, "")
          console.log("success", "Registro creado con éxito");
          return data.ok;
        });
      return value;
    },
  
    OnDeleteSupplier(id: number) {
      const value = delete_supplier(id)
      .then((response) => {
        get().OnGetSuppliers(1, 5, "");
        return response.ok;
      })
      .catch((error: AxiosError<{ status: number }>) => {
        Number(error.response?.data.status);
        return false
      })
      return value;
    },
  
    OnGetSupplierList: async () => {
      get_suppliers_list().then(({ data }) => {
        set({
          supplier: data.supplier,
        });
      });
    },
  
    OnUpdateSupplier(id: number, supplier) {
      const value = update_supplier(id, supplier)
        .then((response) => {
          console.log("success", "Proveedor fue actualizado correctamente");
          get().OnGetSuppliers(1, 5, "");
          return response.data.ok;
        })
        .catch((error: AxiosError<{ status: number }>) => {
          Number(error.response?.data.status);
          return false;
        });
      return value;
    },
  }));