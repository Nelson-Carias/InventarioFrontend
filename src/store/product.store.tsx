//import {  useEffect } from "react";
import { get_product, create_product, update_product, delete_product, get_product_list } from "../service/product.service";
//import { IGetProducts,  IUpdateProduct } from "../types/product.types";
import { create } from "zustand";
import { IProductStore } from "../types/products.store.types";
import { IPagination } from "../types/global.types";
import { AxiosError } from "axios";

export const useProductStore = create<IProductStore>((set, get) => ({
 
    product: [],
    pagination_product: {} as IPagination,
    OnGetProduct: async (page = 1, limit = 5, name = "") => {
     
      get_product(page, limit, name)
        .then(({data}) => {
          set({
            product: data.product,
            pagination_product: {
              total: data.total,
              totalPag: data.totalPag,
              currentPag: data.currentPag,
              nextPag: data.nextPag,
              prevPag: data.prevPag,
              // status: data.status,
              ok: data.ok,
            },
          });
        })
        .catch((error) => {
          // ShowErrorAlert(Number(error.response?.data.status));
          console.log(error)
          set({
            product: [],
            pagination_product: {
              total: 0,
              totalPag: 0,
              currentPag: 0,
              nextPag: 0,
              prevPag: 0,
              // status: 0,
              ok: false,
            },
          });
        });
    },
  
    OnCreateProduct(product) {
      const value = create_product(product)
        .then(({ data }) => {
          get().OnGetProduct(1, 5, "")
          console.log("success", "Registro creado con éxito");
          return data.ok;
        });
      return value;
    },
  
    OnDeleteProduct(id: number) {
      const value = delete_product(id)
      .then((response) => {
        get().OnGetProduct(1, 5, "");
        return response.ok;
      })
      .catch((error: AxiosError<{ status: number }>) => {
        Number(error.response?.data.status);
        return false
      })
      return value;
    },
  
    OnGetProductList: async () => {
      get_product_list().then(({ data }) => {
        set({
          product: data.product,
        });
      });
    },
  
    OnUpdateProduct(id: number, product) {
      const value = update_product(id, product)
        .then((response) => {
          console.log("success", "Proveedor fue actualizado correctamente");
          get().OnGetProduct(1, 5, "");
          return response.data.ok;
        })
        .catch((error: AxiosError<{ status: number }>) => {
          Number(error.response?.data.status);
          return false;
        });
      return value;
    },
  }));

// const useProductStore = () => {



//     const [products, setProducts] = useState<IGetProducts[]> ([]);

//     useEffect(() => {
//         OnGetProducts();
//     }, [])

//     const OnGetProducts = async () => {
//         try {
//             const data = await get_products();
//             setProducts(data.products);
//         } catch (error) {
//             return  ({

//             })

//         }
//     };

//     const OnCreateProduct = async (product: ICreateProduct) => {
//         try {
//             const data = await create_product(product)
//             if(data.ok){
//                 await OnGetProducts()
//             }
//         } catch (error) {
//             return({

//             })
//         }
//     };

//     const OnDeleteProduct = async (id: number) => {
//         try {
//             const data = await delete_product(id)
//             if(data.ok){
//                 await OnGetProducts()
//             }
//         } catch (error) {
//             return({

//             })
//         }
//     };

//     const OnUpdateProduct = async (id: number, product: IUpdateProduct) => {
//         try {
//             const data = await update_product(id, product)
//             if(data.ok){
//                 await OnGetProducts()
//             }
//         } catch (error) {
//             return({

//             })
//         }
//     };

//     return{
//         products,
//         OnGetProducts,
//         OnCreateProduct,
//         OnDeleteProduct,
//         OnUpdateProduct,
//     }

// }

// export default useProductStore