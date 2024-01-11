import { IUpdateCustomer, ICreateCustomer, IGetCustomer } from './customer.types';
import { IPagination } from "./global.types";
export interface ICustomerStore {
    customer: IGetCustomer[];
    pagination_customer: IPagination
    OnGetCustomer: (page: number, limit: number, name: string) => Promise<void>;
    OnCreateCustomer: (product: ICreateCustomer) => Promise<boolean>;
    OnDeleteCustomer: (id: number) => Promise<boolean>;
    OnUpdateCustomer: (id: number, product: IUpdateCustomer) => Promise< boolean | void>;
    OnGetCustomerList: () => Promise<void>;
}