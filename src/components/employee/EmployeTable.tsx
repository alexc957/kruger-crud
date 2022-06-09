import { createUserWithEmailAndPassword, getAuth, UserCredential } from 'firebase/auth'
import { Button } from 'native-base'
import React, { useContext } from 'react'
import { escapeLeadingUnderscores } from 'typescript'
import FirebaseContext from '../../contexts/FirebaseContext'
import { addUser } from '../../firebase/services'
import { Employee } from '../../interfaces/Employee'
import { KrugerUser } from '../../interfaces/User'


interface TableProps {
    employees: Employee[]
}
export default function EmployeTable({employees}:TableProps ) {

  const app = useContext(FirebaseContext);
  const darAlta = async (user: Employee) => {
    
    try{
      
      const password: string = Math.random().toString(36).slice(2, 10);
      //const response : UserCredential= await createUserWithEmailAndPassword(auth, user.email,password);
      //const uid:string = response.user.uid;
      /*await addUser(uid,{
        email: user.email,
        role: "user",
        name: user.nombres
      });*/
      // the following code it is insecure, change it to post in a new version lol 
      const response  = await fetch(`https://us-central1-krugre-crud.cloudfunctions.net/createUser?email=${user.email}&password=${password}&name=${user.nombres}`);  
      if(response.status===200){
        alert(`Usuario creado con mail: ${user.email} y password: ${password}`);
      }else {
        alert("error al crear el usuario");
      }
     
    }catch(e){
      console.log(e);
      alert("ocurrio un problema")
    }
  }
  return (
    <table>
      <thead>
        <tr>
                <th>Cedula</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th>Fecha de Nacimiento</th>
                <th>Direccion de domicilio</th>
                <th>Telefono movil</th>
                <th>Estado de vacunacion</th>
                <th>Tipo de vacunacion</th>
                <th>Fecha de Vacunacion</th>
                <th>Numero de Dosis</th>
                <th>Acciones </th>

            </tr>
      </thead>
       <tbody>
       {employees.map((emp:Employee, index: number) => <tr key={index}>

            <th>{emp.cedula}</th>
            <th>{emp.nombres}</th>
            <th>{emp.apellidos}</th>
            <th>{emp.email}</th>
            <th>{emp.fechaNacimiento}</th>
            <th>{emp.dirDomicilio}</th>
            <th>{emp.telMovil}</th>
            <th>{emp.vacStatus}</th>
            <th>{emp.vaccineType}</th>
            <th>{emp.vaccinationDate}</th>
            <th>{emp.numDosis}</th>
            <th> 
                <Button onPress={() => darAlta(emp)}>Dar de Alta</Button>
            </th>

            </tr>)}
       </tbody>
    </table>
  )
}
