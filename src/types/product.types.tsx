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

export interface ICreateProduct{
    supplierId: number
    name: string
    description: string
    price: number
    stock: number
}

export interface IUpdateProduct{
    id: number
    name: string
    description: string
    price: number
    stock: number
    supplierId: number
}
