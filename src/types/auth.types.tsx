export interface LoginData{
    email: string
    password: string
  }
  
  export interface User {
    id: number
    name: string
    lastName: string
    email: string
    rolId: number
  }
  
  export interface Response{
    tokenb: string
    user?: User
  }
  
  