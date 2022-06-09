import React, {useEffect, useState}from 'react'
import { Box, Button, Center, Container, Modal } from 'native-base'

import EmployeeForm from '../employee/EmployeeForm'
import EmployeTable from '../employee/EmployeTable';
import { listenEmployees } from '../../firebase/services';
import { Employee } from '../../interfaces/Employee';
export default function AdminDashboard() {

   const [showForm, setShowForm] = useState<boolean>(false);
   const [employees, setEmployees] = useState<Employee[]>([])

   useEffect(()=> {
      const unsubscribe = listenEmployees(setEmployees);

      return unsubscribe;
   }, [])
   
   
  return <Box
  bg={ "lightBlue.100"}
  minHeight="100vh"
  pt={"25"}
  
  px={4}
>
   <Container justifyContent={"center"} alignItems="center">
      <Button onPress={() => setShowForm(true)}>Agregar nuevo Empleado</Button>
      <EmployeTable employees={employees} />
   </Container>


{ showForm &&  <Modal isOpen={showForm} onClose={() => setShowForm(false)} size="lg">
      <Modal.Content maxWidth={"500"}>
         <Modal.CloseButton />
         <Modal.Header>Empleado Nuevo</Modal.Header>
         <Modal.Body>
            <EmployeeForm cedulas={employees.map((emp)=> emp.cedula)} />
         </Modal.Body>

      </Modal.Content>


   </Modal>}
 
</Box>
}
