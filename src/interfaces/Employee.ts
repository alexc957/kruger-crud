export interface Employee {
    cedula: string;
    nombres: string;
    apellidos: string;
    email: string;
    fechaNacimiento?: string;
    dirDomicilio?: string;
    telMovil?: string; 
    vacStatus?: string;
    vaccineType?: string;
    vaccinationDate?: string;
    numDosis?: number;
}