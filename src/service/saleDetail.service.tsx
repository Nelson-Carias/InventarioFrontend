import axios from "axios";
import {API_URL} from "../utils/constants"
import {  IGetSaleDetail, IUpdateSaleDetail, ICreateSaleDetail } from "../types/saleDetail.types";
import { GetToken } from "../utils/local_data";

// export const get_saleDetail = async () => {
//     const response = await axios.get<{saleDetails: IGetSaleDetail[]}>(`${API_URL}/saleDetail`)
//     return response.data
// }
export const get_saleDetail = async () => {
    const { data } = await axios.get<{ saleDetails: IGetSaleDetail[] }>(
      API_URL + "/saleDetail",
      { 
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    }
    );
    return data;
  };

  // export const create_saleDetail = async (saleDetail: ICreateSaleDetail) => {
  //   const { data } = await axios.post<BasicResponse>(API_URL + "/saleDetail", {
  //     saleDetail,
  //   });
  
  //   return data;
  // };
  export const create_saleDetail = async (saleDetail: ICreateSaleDetail) => {
    const response = await axios.post(`${API_URL}/saleDetail`, saleDetail, { 
      headers:{
          Authorization: "Bearer " + GetToken()
      }
  })
    return response.data;
}
// export const update_saleDetail = async (id: number, sale: IUpdateSaleDetail) => {
//     const {data} = await axios.put<{ok: boolean}>(API_URL + '/saleDetail/' + id, sale,{
//         headers:{
//             Authorization: "Bearer " + GetToken()
//         }
//     })
//     return data;
// }

export const update_saleDetail = async (id: number, saleDetail: IUpdateSaleDetail) => {
    const { data } = await axios.put<{ ok: boolean; msg: string }>(
      API_URL + "/saleDetail/" + id, saleDetail, { 
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    }
     
    );
    return data;
  };

export const delete_saleDetail = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(API_URL + "/saleDetail/" + id,
    { 
        headers:{
            Authorization: "Bearer " + GetToken()
        }
    })

    return data
}