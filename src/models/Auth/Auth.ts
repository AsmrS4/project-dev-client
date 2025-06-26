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

export interface ProfileProps {
    email: string;
    fullName: string;
    phoneNumber: string | number;
    image: string | null;
}