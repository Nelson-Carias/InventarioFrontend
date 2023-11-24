import { get_suppliers, create_supplier} from './../service/supplier.service';
import { IGetSuppliers,ICreateSupplier } from './../types/supplier.types';
import {defineStore} from "pinia"

export const useSupplierStore = defineStore('supplier', {
    state:()=>({
        supplier:[] as IGetSuppliers[],
        supplier_list:[] as IGetSuppliers[]
    }),
    actions:{
        OnGetSuppliers(name:string, contact:number, direction:string){
            get_suppliers(name, contact, direction)
            .then(({data}) =>{
                if(data.ok){
                    this.supplier = data.suppliers
                }
            })
        },

        OnCreateSupplier(supplier: ICreateSupplier){
            const data = create_supplier(supplier)
            if(data.then){
                data.then(({data})=>{
                    if(data.ok)
                    alert("Supplier created")
                    this.OnGetSuppliers()
                }                
                )}
        }

    }
})