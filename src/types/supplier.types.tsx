export interface IGetSuppliers {
    id: number
    name: string
    contact: number
    direction: string
    state: boolean
}

export interface ICreateSupplier{
    name: string
    contact: number
    direction: string

}

export interface IGetSuppliersResponse extends IBasicResponse{
    suppliers: IGetSuppliers[]
}

export interface IBasicResponse {
    ok: true
    status : number
}