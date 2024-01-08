import { IPagination } from "./global.types";
import { IGetSuppliers, IUpdateSupplier, ICreateSupplier } from "./supplier.types";
export interface ISupplierStore {
    supplier: IGetSuppliers[];
    pagination_supplier: IPagination
    OnGetSuppliers: (page: number, limit: number, name: string) => Promise<void>;
    OnCreateSupplier: (supplier: ICreateSupplier) => Promise<boolean>;
    OnDeleteSupplier: (id: number) => Promise<boolean>;
    OnUpdateSupplier: (id: number, supplier: IUpdateSupplier) => Promise< boolean | void>;
    OnGetSupplierList: () => Promise<void>;
}