export interface IGetUser {
    id: number 
    name: string
    lastName: string
    email: string
    password: string
    rolId: number
    state: boolean
    rol: {
        id: number
        rol: string
        state: boolean
    }
}

export interface ICreateUser {
    name: string
    lastName: string
    email: string
    password: string
    rolId: number
}

export interface IUpdateUser{
    id: number
    name: string
    lastName: string
    email: string
    password: string
    rolId: number
}

