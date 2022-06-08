import React from 'react'
import { Formik } from 'formik'
import { FormControl, Input, VStack, Button } from 'native-base';
import { Employee } from '../../interfaces/Employee';

const onValidate = (values: Employee) => {
    const errors:any = {};
    const cedulaRegex = /^(\d)(?!\1{9}$)\d{9}$/
    const nameRegex = /[a-zA-Z]/;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
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

    return errors;


    


}

export default function EmployeeForm() {

    const onSubmit = (data: Employee) => {
        console.log(data);
    }
  return (
    <Formik  onSubmit={onSubmit} validate={onValidate} initialValues={{
        cedula: "",
        nombres: "",
        apellidos: "",
        email: "",
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

                <Button onPress={handleSubmit} colorScheme="pink">
                         Submit
                </Button>
              
              </VStack>}

      </Formik>
  )
}
