export interface IGetRoles {
    id: number
    rol: string
    state: boolean
}

export interface ICreateRol{
    rol : string
}

export interface IGetRolesResponse extends IBasicResponse{
    roles: IGetRoles[]
}

export interface IBasicResponse {
    ok: true
    status : number
}