export interface ILogin {
    email: string;
    password: string|number;
}

export interface IRegister {
    email: string,
    fullName: string,
    password: string|number,
    phoneNumber?: string|number

}