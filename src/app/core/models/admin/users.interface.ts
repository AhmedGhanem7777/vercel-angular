export interface IResponseGetUsers {
    success:boolean,
    data:{
        totalCount:number,
        users:IUsers[]
    }
}
export interface IResponseSpecificUser {
    success:boolean,
    message:string,
    data:{
        user:IUsers
    }
}
export interface IUsers {
    country: string,
    createdAt: string,
    email: string,
    phoneNumber: number,
    profileImage: string,
    role: string,
    updatedAt: string,
    userName: string,
    verified: boolean,
    _id: string
}