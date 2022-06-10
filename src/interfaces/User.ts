import { string } from "yup";

export interface  KrugerUser {
    email: string;
    name: string;
    role: string;
    uid?: string;
    cedula?: string;

}