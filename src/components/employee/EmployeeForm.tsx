import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import { FormControl, Input, VStack, Button, Select, useToast } from 'native-base';
import { Employee } from '../../interfaces/Employee';
import UserContext from '../../contexts/UserContext';
import { VACCINE_TYPES } from '../../constanst/constants';
import { addEmployee } from '../../firebase/services';

interface FormProps {
    cedulas: string[];
}

export default function EmployeeForm({cedulas}:FormProps) {
    const user = useContext(UserContext);
    const toast = useToast()

    const [isVaccinated, setIsVaccinated] = useState<boolean>(false);
    const onValidate = (values: Employee) => {
        const errors:any = {};
        const cedulaRegex = /^(\d)(?!\1{9}$)\d{9}$/
        const nameRegex = /[a-zA-Z]/;
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if(values.vacStatus==="Vacunado"){
            setIsVaccinated(true);
        }
        if(!cedulaRegex.test(values.cedula) || values.cedula.length<10){
            errors.cedula = "cedula debe ser 10 caracteres numericos"
        }
        if(!nameRegex.test(values.nombres)|| values.nombres===""){
            errors.nombres = "El nombre solo debe tener caracteres no numericos";
        }
        if(!nameRegex.test(values.apellidos)|| values.apellidos===""){
            errors.apellidos = "Los  apellidos solo deben tener caracteres no numericos";
        }
    
        if(!emailRegex.test(values.email) || values.email===""){
            errors.email = "email tiene que ser valido ";
        }
    
        if(values?.numDosis && values.numDosis<0){
            errors.numDosis ="Numero de dosis tiene que ser mayor a cero";
        }
        return errors;
    
    
        
    
    
    }

    const onSubmit = async (data: Employee) => {
        try {
            if(cedulas.includes(data.cedula)){
                alert("El usuario ya ha sido registrado anteriormente ")
                return; 
            }
            console.log("entre aqui ?")
            await addEmployee(data.cedula, data);
             alert("Empleado agregado");
        }catch(e){
            console.log("e ",e);
            alert("Error al agregar empleado");
        }
    }
  return (
    <Formik  onSubmit={onSubmit}  validate={onValidate} initialValues={{
        cedula: "",
        nombres: "",
        apellidos: "",
        email: "",
        fechaNacimiento: "",
        dirDomicilio: "",
        telMovil: "",
        vacStatus: "",
        vaccineType: "",
        vaccinationDate: "",
        numDosis: 0,

      }} >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors
          }: any)=> <VStack width={"80%"} space={4}>
                <FormControl isRequired isInvalid={'cedula' in errors}>
                    <FormControl.Label>Cedula</FormControl.Label>
                    
                    <Input onBlur={handleBlur('cedula')} placeholder="Cedula" onChangeText={handleChange('cedula')} value={values.cedula} />
                    <FormControl.ErrorMessage>
                    {errors.cedula}
                    </FormControl.ErrorMessage>
                </FormControl>
              
                <FormControl isRequired isInvalid={'nombres' in errors}>
                    <FormControl.Label>Nombres</FormControl.Label>
                    
                    <Input onBlur={handleBlur('nombres')} placeholder="Nombres" onChangeText={handleChange('nombres')} value={values.nombres} />
                    <FormControl.ErrorMessage>
                    {errors.nombres}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'apellidos' in errors}>
                    <FormControl.Label>Apellidos</FormControl.Label>
                    
                    <Input onBlur={handleBlur('apellidos')} placeholder="apellidos" onChangeText={handleChange('apellidos')} value={values.apellidos} />
                    <FormControl.ErrorMessage>
                    {errors.apellidos}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'email' in errors}>
                    <FormControl.Label>Email</FormControl.Label>
                    
                    <Input onBlur={handleBlur('email')} placeholder="email" onChangeText={handleChange('email')} value={values.email} />
                    <FormControl.ErrorMessage>
                    {errors.email}
                    </FormControl.ErrorMessage>
                </FormControl>

                    {/* lo que puede ingresar el otro usuario  */}

                <FormControl isDisabled={user?.role==="admin"} >
                    <FormControl.Label>Fecha de Nacimiento</FormControl.Label>
                    
                    <Input 
                        type='date'
                        
                        onBlur={handleBlur('fechaNacimiento')} 
                        placeholder="Fecha de nacimiento" 
                        onChangeText={handleChange('fechaNacimiento')} 
                        value={values.fechaNacimiento} />
                
                </FormControl>
               
                <FormControl isDisabled={user?.role==="admin"}>
                    <FormControl.Label>Direccion de  domicilio</FormControl.Label>
                    
                    <Input 
                        type='text'
                        onBlur={handleBlur('dirDomicilio')} 
                        placeholder="direccion de domicilio" 
                        onChangeText={handleChange('dirDomicilio')} 
                        value={values.dirDomicilio} />
                
                </FormControl>

                <FormControl isDisabled={user?.role==="admin"}>
                    <FormControl.Label>Telefono movil</FormControl.Label>
                    
                    <Input 
                        type='text'
                        onBlur={handleBlur('telMovil')} 
                        placeholder="telefono movil" 
                        onChangeText={handleChange('telMovil')} 
                        value={values.telMovil} />
                
                </FormControl>


                <FormControl isDisabled={!isVaccinated}>
                    <FormControl.Label>Estado de Vacunacion</FormControl.Label>
                    
                        <Select 
                            selectedValue={values.vacStatus}
                            onValueChange={handleChange('vacStatus')}>
                                <Select.Item  label='No Vacunado' value='No Vacunado'/>
                                <Select.Item  label='Vacunado' value='Vacunado'/>
                            
                        </Select>
                
                </FormControl>
                <FormControl isDisabled={!isVaccinated}>
                    <FormControl.Label>Tipo de Vacuna</FormControl.Label>
                    
                        <Select 
                            selectedValue={values.vaccineType}
                            onValueChange={handleChange('vaccineType')}>
                                {VACCINE_TYPES.map((vacc: string, index: number)=><Select.Item key={index} label={vacc} value={vacc}/>)}
                                
                            
                        </Select>
                
                </FormControl>


                <FormControl isDisabled={!isVaccinated} >
                    <FormControl.Label>Fecha de Vacunacion</FormControl.Label>
                    
                    <Input 
                        type='date'
                        
                        onBlur={handleBlur('vaccinationDate')} 
                        placeholder="Fecha de Vacunacion" 
                        onChangeText={handleChange('vaccinationDate')} 
                        value={values.vaccinationDate} />
                
                </FormControl>


                <FormControl isDisabled={!isVaccinated} >
                    <FormControl.Label>Numero de dosis</FormControl.Label>
                    
                    <Input 
                        type='number'
                        
                        onBlur={handleBlur('numDosis')} 
                        placeholder="Numero de dosis" 
                        onChangeText={handleChange('numDosis')} 
                        value={values.numDosis} />

                    <FormControl.ErrorMessage>
                    {errors.numDosis}
                    </FormControl.ErrorMessage>
                
                </FormControl>
                <Button onPress={handleSubmit} colorScheme="pink">
                         Submit
                </Button>
              
              </VStack>}

      </Formik>
  )
}
