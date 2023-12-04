export interface IGetSaleDetail{
    id: number
    amount: number
    unitPrice: number
    saleId: number
    productId: number
    state: boolean
    sale:{
      id: number
    createDate: Date
    total: number
    customerId: number
    state: boolean
  }
  }
  export interface ICreateSaleDetail{
    
    amount: number
    unitPrice: number
    saleId: number
    productId: number

}
  export interface IUpdateSaleDetail{
    id: number
    amount: number
    unitPrice: number
    saleId: number
    productId: number
}


  export interface SaleDetailState{
    saleDetail: IGetSaleDetail[]
    OnGetSaleDetail: ()=> Promise<void>
    OnCreateSaleDetail:(saleDetail:ICreateSaleDetail)=>Promise<void>
    OnUpdateSaleDetail: (id: number, saleDetail:  IUpdateSaleDetail)=>Promise<void> 
    OnDeleteSaleDetail: (id: number)=>Promise<void>
  }
  export interface BasicResponse {
    ok: boolean;
    msg: string;
  }