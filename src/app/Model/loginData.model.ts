export interface LoginData {
    email:string;
    password: string;
}

export class RegisterData {
    firstName: string = '';
    lastName:  string = '';
    email:  string = '';
    phone?:  string = '';
    // address?:  string = '';
    password:  string = ''
    confirmPassword:  string = '';
}