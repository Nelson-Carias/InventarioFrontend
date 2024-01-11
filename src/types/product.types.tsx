import { IPagination } from "./global.types";

export interface IGetProducts{
    id: number
    supplierId: number
    name: string
    description: string
    price: number
    stock: number
    state: boolean
    supplier: {
        id:number
        name: string
        contact: number
        state: boolean
    }
}
// export interface IGetProduct {
//     product: IGetProducts[];
//     ok: boolean;
//   }

export interface ICreateProduct{
    supplierId: number
    name: string
    description: string
    price: number
    stock: number
}

export interface IUpdateProduct{
    
    name: string
    description: string
    price: number
    stock: number
    supplierId: number
}
export interface IGetSuppliersResponse extends IBasicResponse{
    //supplier igual que la ruta index de la api   
    product: IGetProducts[]
}
export interface IBasicResponse {
    ok: true
    status : number
}
export interface IGetProductsPaginated extends IPagination {
    product : IGetProducts[]
}