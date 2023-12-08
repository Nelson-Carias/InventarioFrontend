import { SaleDetailState } from '../types/saleDetail.types';
import { get_saleDetail, create_saleDetail ,update_saleDetail ,delete_saleDetail } from '../service/saleDetail.service';
import { create } from 'zustand';
import {  ICreateSaleDetail, IUpdateSaleDetail} from '../types/saleDetail.types';

const useSaleDetailStore = create<SaleDetailState>((set, get) => ({
  saleDetail: [],
  async OnGetSaleDetail() {
    const data = await get_saleDetail();
    if (data.saleDetails) {
      set((state) => ({
        ...state,
        saleDetail: data.saleDetails
      }));
    } else {
      data.saleDetails = [];
    }
  },
  async OnCreateSaleDetail(saleDetail: ICreateSaleDetail) {
    const data = await create_saleDetail(saleDetail);
    if (data.ok) {
      get().OnGetSaleDetail();
    }
    
  },
  //Modificar
  async OnUpdateSaleDetail(id:number, saleDetail: IUpdateSaleDetail) {
    const data = await update_saleDetail(id, saleDetail);
    if (data.ok) {
      get().OnGetSaleDetail();
    } 
  },



  async OnDeleteSaleDetail(id: number) {
    const data = await delete_saleDetail(id);
    if (data.ok) {
      get().OnGetSaleDetail();
    }
  },
})
)
export default useSaleDetailStore