import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Box, Button, Center, FormControl, Input, Stack, useToast } from 'native-base'
import React, { useContext, useState } from 'react'
import FirebaseContext from '../contexts/FirebaseContext';

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const app = useContext(FirebaseContext);

    const toast = useToast()

    const onLogin = async () => {
        try{
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth,email, password);
        }catch(e){
            console.log("e ? ", e);
            toast.show({
                title: 'Email o password incorrectos',
                bg: "error.300"
                 
            })

        }

    }
    
  return (
        <Center justifyContent={'center'}  alignItems="center">

            <Box w={"600"} shadow={5} alignItems="center" justifyContent={"center"}>

            <FormControl isRequired w={"400"} >
                    <Stack mx={4}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input 
                            p={2} 
                            placeholder="Email"  
                            type='email' 
                            value={email} 
                            onChangeText={(e: string)=> setEmail(e)}/>
                        <FormControl.HelperText>
                            Ej: alex@mail.com
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage>correo invalido</FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                    <FormControl isRequired w={"400"}>
                    <Stack mx={4}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input 
                            p={2} 
                            placeholder="Email"  
                            type='password' 
                            value={password} 
                            onChangeText={(e: string)=> setPassword(e)}/>
                        <FormControl.HelperText>
                            El password es personal y secreto
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage>Este campo es valido</FormControl.ErrorMessage>

                        <Button onPress={onLogin} size="lg" shadow={2}  variant="solid" m={2} >Ingresar</Button>
                    </Stack>
                    </FormControl>
                    
            </Box>


        </Center>
    
    )
}
