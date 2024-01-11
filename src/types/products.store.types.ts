import { IUpdateProduct, ICreateProduct, IGetProducts } from './product.types';
import { IPagination } from "./global.types";
export interface IProductStore {
    product: IGetProducts[];
    pagination_product: IPagination
    OnGetProduct: (page: number, limit: number, name: string) => Promise<void>;
    OnCreateProduct: (product: ICreateProduct) => Promise<boolean>;
    OnDeleteProduct: (id: number) => Promise<boolean>;
    OnUpdateProduct: (id: number, product: IUpdateProduct) => Promise< boolean | void>;
    OnGetProductList: () => Promise<void>;
}