export interface IGetCustomer{
    id: number
    name: string
    lastName:string
    direction: string
    state: boolean
}

export interface ICreateSupplier{
    name: string
    lastName:string
    direction: string

}

export interface IGetSuppliersResponse extends IBasicResponse{
    //supplier igual que la ruta index de la api   
    customer: IGetCustomer[]
}

export interface IBasicResponse {
    ok: true
    status : number
}