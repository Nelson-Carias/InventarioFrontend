import { IPagination } from "./global.types";


export interface IGetCustomer{
    id: number
    name: string
    lastName:string
    direction: string
    state: boolean
}

// export interface ICreateSupplier{
//     name: string
//     lastName:string
//     direction: string

// }
export interface ICreateCustomer{
    
    name: string
    lastName: string
    direction: string
   
}
export interface IUpdateCustomer{
    
    name: string
    lastName: string
    direction: string
   
}
export interface IGetCustomerResponse extends IBasicResponse{
    //supplier igual que la ruta index de la api   
    customer: IGetCustomer[]
}

export interface IBasicResponse {
    ok: true
    status : number
}

export interface IGetCustomerPaginated extends IPagination {
    customer : IGetCustomer[]
}