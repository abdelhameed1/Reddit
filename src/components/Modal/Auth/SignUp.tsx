import React from 'react';
import { AuthModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';

const SignUp:React.FC = () => {
    const setAuthModal = useSetRecoilState(AuthModalState)
    const [signUpForm , setSignUpForm] = React.useState({
        email : '',
        password : '',
        confirmPassword : ''
    
    })
    const handleSubmit = () => {}
    const handleChange =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setSignUpForm(prev =>({
            ...prev , [e.target.name] : e.target.value
        }))
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input required 
            fontSize={'10pt'}
             name='email' 
             placeholder='E-Mail' _placeholder={{color:'gray.500'}}
             type='email' 
             mb={2} 
             onChange={handleChange}
             _hover={{
                bg : 'white',
                border : '1px solid',
                borderColor : 'blue.500'
             }}
             _focus={{
                outline : 'none',
                bg : 'white',
                border : '1px solid',
                borderColor : 'blue.500'
             }}
             bg={"gray.50"}
            
              />
            <Input required 
            fontSize={'10pt'} 
            name='password' 
            type='password'
             placeholder='Password'_placeholder={{color:'gray.500'}} 
             onChange={handleChange}
             _hover={{
                bg : 'white',
                border : '1px solid',
                borderColor : 'blue.500'
             }}
             _focus={{
                outline : 'none',
                bg : 'white',
                border : '1px solid',
                borderColor : 'blue.500'
             }}
             bg={"gray.50"}
              mb={2}
             />
            <Input required 
            fontSize={'10pt'} 
            name='confirmPassword' 
            type='password'
             placeholder='Confirm Password'_placeholder={{color:'gray.500'}} 
             onChange={handleChange}
             _hover={{
                bg : 'white',
                border : '1px solid',
                borderColor : 'blue.500'
             }}
             _focus={{
                outline : 'none',
                bg : 'white',
                border : '1px solid',
                borderColor : 'blue.500'
             }}
             bg={"gray.50"}
              mb={2}
             />
            <Button width={'100%'} height={"36px"} mt={2} mb={2} type='submit'> 
                Sign Up
            </Button>
            <Flex fontSize={'9pt'} justifyContent={"center"} >
                <Text mr={1}>Already a Redditor ?</Text>
                <Text color={"blue.500"} fontWeight={700} cursor={"pointer"} onClick={()=> setAuthModal(prev => ({
                    ...prev , view : 'login'
                }))}>Log In</Text>
                
            </Flex>
        </form>
    )
}
export default SignUp;