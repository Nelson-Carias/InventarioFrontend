import { IPagination } from "./global.types";


export interface IGetSuppliers {
    id: number
    name: string
    contact: string
    direction: string
    state: boolean
}

export interface IGetSupplier {
    supplier: IGetSuppliers[];
    ok: boolean;
  }

export interface ICreateSupplier{
    name: string
    contact: string
    direction: string

}
export interface  IUpdateSupplier {
    name: string
    contact: string
    direction: string
}

export interface IGetSuppliersResponse extends IBasicResponse{
    //supplier igual que la ruta index de la api   
    supplier: IGetSuppliers[]
}

export interface IBasicResponse {
    ok: true
    status : number
}
export interface IGetSuppliersPaginated extends IPagination {
    supplier : IGetSuppliers[]
}