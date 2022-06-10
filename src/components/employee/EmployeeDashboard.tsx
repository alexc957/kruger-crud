import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext';
import { Employee } from '../../interfaces/Employee'

import axios from 'axios'
import { Center, Spinner } from 'native-base';
import EmployeeForm from './EmployeeForm';

export default function EmployeeDashboard() {
  const [currentEmployee, setCurrentEmployee] = useState<Employee| null>(null);
  const user = useContext(UserContext);
  useEffect(()=> {
    const getEmployee = async ()  => {

    try{
        const response = await axios.get(`https://us-central1-krugre-crud.cloudfunctions.net/api/employee/${user?.cedula}`);
        if(response.status===200){
          setCurrentEmployee(response.data);
        }
    }catch(e){
      console.log("ERROR ", e)
    }
    }
    getEmployee() 
  }, [])
  return (
    <Center bg="lightBlue.100">
      {!currentEmployee? <Spinner /> : <EmployeeForm  currentEmployee={currentEmployee}/>}
    </Center>
  )
}
