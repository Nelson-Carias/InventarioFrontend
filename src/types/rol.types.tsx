import { IPagination } from "./global.types";

export interface IGetRoles {
    id : number,
    rol : string
    state: boolean;
}
export interface IGetRol {
    roles: IGetRoles[];
    ok: boolean;
  }
  
export interface ICreateRol {
 rol : string
}

export interface  IUpdateRol {
    rol : string
}

export interface IGetRolPaginated extends IPagination {
    roles : IGetRoles[]
}