export interface IGetSale {
    id: number
    createDate: Date
    total: number
    customerId: number
    state: boolean
    customer:{
        id: number
        name: string
        lastName:string
        direction: string
        state: boolean
    }
}

export interface ICreateSale{
    
    
    total: number
    customerId: number

}
export interface IUpdateSale{
    id: number
    total: number
    customerId: number
    
}
// export interface IGetSaleResponse extends IBasicResponse{
//     //supplier igual que la ruta index de la api   
//     sale: IGetSale[]
// }

// export interface IBasicResponse {
//     ok: true
//     status : number
// }