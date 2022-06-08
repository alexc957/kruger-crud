import React from 'react'
import { Box, Center } from 'native-base'
import { Formik } from 'formik'
import EmployeeForm from './EmployeeForm'
export default function AdminDashboard() {
  return <Box
  bg={ "lightBlue.100"}
  minHeight="100vh"
  justifyContent="center"
  px={4}
>
   <Center>
      <EmployeeForm />
   </Center>
 
</Box>
}
