// Login Interfaces
export interface ILoginRequest {
    email: string,
    password: string
}
export interface ILoginResponse {
    data: IUserData,
    message: string,
    success: boolean
}

export interface IUserData {
    token: string,
    user: {
        role: string,
        userName: string,
        _id: string
    }
}

// Forgot Password
export interface IResponseForgotPass {
    message: string,
    success: boolean
}

// Reset Password
export interface IResponseResetPass extends IResponseForgotPass { }
export interface ICodeAndNewPass {
    email: string,
    seed: string,
    password: string,
    confirmPassword: string
}

// Change Password
export interface IResponseChangePass extends IResponseForgotPass { }
export interface INewPass {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}


// Register
export interface IResponseRegister {
    success: boolean,
    message:string,
    data: {
        userCreated: {
            country:string,
            createdAt:string,
            email:string,
            password:string,
            phoneNumber:number,
            profileImage:string,
            role:string,
            updatedAt:string,
            userName:string,
            verified:boolean,
            _id:string
        }
    }
}