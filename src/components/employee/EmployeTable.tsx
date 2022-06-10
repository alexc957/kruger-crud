
import { Button, Heading , Center, Select} from 'native-base'
import React, {useState} from 'react'
import axios from 'axios'

import { Employee } from '../../interfaces/Employee'
import "./table.css";
import { VACCINE_TYPES } from '../../constanst/constants';


interface TableProps {
    employees: Employee[]
}
export default function EmployeTable({employees}:TableProps ) {

  const [filterType, setFilterType] = useState<string>("Estado de vacunacion"); // estado de vacunacion, tipo de vacuna, o rango de fecha de vacunacion

  const [filterValue, setFilterValue] = useState<string>("No Vacunado");

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [filteredEmployees, setFIlteredEmployees ] = useState<Employee[]>(employees);

  



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
      const response  = await axios.post(`https://us-central1-krugre-crud.cloudfunctions.net/api/user`,{
        email: user.email,
        password, // esto es inseguro lol jaja solo para no olvidarme el password de cada usuario : / 
        name: user.nombres,
        cedula: user.cedula,
        
      });  
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

  const renderFilterValueInput = () => {
    if(filterType==="Estado de vacunacion"){
      return  <Select selectedValue={filterValue} onValueChange={(t)=> setFilterValue(t)}>
      <Select.Item  label="Vacunado" value='Vacunado'/>
      <Select.Item  label="No Vacunado" value='No Vacunado'/>
     
    </Select>
    } 
    
    if(filterType==="Tipo de Vacuna") {
      return <Select selectedValue={filterValue} onValueChange={(t)=> setFilterValue(t)}>
        {VACCINE_TYPES.map((vacc:string)=><Select.Item  label={vacc} value={vacc}/>) }
      
     
    </Select>
    }

    return <Center>
      <div>
        <label htmlFor='start' >Fecha Inicio</label>
        <input value={startDate} id="start" onChange={e=> setStartDate(e.target.value)} type="date" />
      </div>
      <div>
        <label htmlFor='end' >Fecha Final</label>
        <input value={endDate} id="end" onChange={e=> setEndDate(e.target.value)} type="date" />
      </div>
    </Center>


  }

  const onReset = () => {
    setFIlteredEmployees(employees);
  }
  const onFilter = () => {
    switch(filterType){
      case "Estado de vacunacion":
      case "Tipo de Vacuna":
        const filteredValues = employees.filter((emp:Employee)=> {
          const fieldTofilter = filterType==="Estado de vacunacion"? "vacStatus" : "vaccineType";
          return emp[fieldTofilter] === filterValue;
        })
        setFIlteredEmployees(filteredValues)
        break;
      case "Rango de fechas de vacunacion":
        const start:Date = new Date(startDate);
        const end:Date = new Date(endDate);
        const filteredByDate = employees.filter((emp:Employee)=>{
          if(!emp.vaccinationDate){
            return false;
          }
          const vaccDate: Date = new Date(emp.vaccinationDate);
          return vaccDate > start && vaccDate < end;
        })
        setFIlteredEmployees(filteredByDate);

        
     
        
    }
  }
  return (
    <>
    <Center>
      <Heading size={"md"}>Criterio de filtro</Heading>
      <Select selectedValue={filterType} onValueChange={(t)=> setFilterType(t)}>
        <Select.Item  label="Estado de vacunacion" value='Estado de vacunacion'/>
        <Select.Item  label="Tipo de vacuna" value='Tipo de Vacuna'/>
        <Select.Item  label="Rango de fechas de vacunacion" value='Rango de fechas de vacunacion'/>
      </Select>

      {renderFilterValueInput()}
      <Button onPress={onFilter}>FIltrar</Button>
      <Button onPress={onReset}>Reset</Button>
    </Center>
    
    <table>
      <thead>
        <tr>
                <th>
                  <Heading size={"md"}>Cedula</Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                    Nombres
                  </Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                      Nombres
                  </Heading>
                </th>
                <th>
                  <Heading size={"md"}>Email</Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                  Fecha de Nacimiento
                  </Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                  Direccion de domicilio
                  </Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                      Telefono movil
                  </Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                  Estado de vacunacion
                  </Heading>
                </th>
                <th> 
                  <Heading size={"md"}>
                  Tipo de vacunacion
                  </Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                  Fecha de Vacunacion
                  </Heading>
                </th>
                <th> 
                  <Heading size={"md"}>
                  Numero de Dosis
                  </Heading>
                </th>
                <th>
                  <Heading size={"md"}>
                  Acciones 
                  </Heading>
                </th>

            </tr>
      </thead>
       <tbody>
       {filteredEmployees.map((emp:Employee, index: number) => <tr key={index}>

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
    </>   
  )
}
