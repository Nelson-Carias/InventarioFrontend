import { IPagination } from "./global.types";
import { IGetRoles, IUpdateRol, ICreateRol } from "./rol.types";
export interface IRoleStore {
    roles: IGetRoles[];
    pagination_roles: IPagination
    OnGetRoles: (page: number, limit: number, name: string) => Promise<void>;
    OnCreateRol: (rol: ICreateRol) => Promise<boolean>;
    OnDeleteRol: (id: number) => Promise<boolean>;
    OnUpdateRol: (id: number, rol: IUpdateRol) => Promise< boolean | void>;
    OnGetRolesList: () => Promise<void>;
}