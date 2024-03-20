import React from 'react';
import { AuthModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase/clientApp';
import FIREBASE_ERRORS from '@/firebase/errors';


const Login: React.FC= () => {
    const [loginForm, setLoginForm] = React.useState({
        email: '',
        password: ''

    })

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
    const setAuthModal = useSetRecoilState(AuthModalState)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
        
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input required
                fontSize={'10pt'}
                name='email'
                placeholder='E-Mail' _placeholder={{ color: 'gray.500' }}
                type='email'
                mb={2}
                onChange={handleChange}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg={"gray.50"}

            />
            <Input required
                fontSize={'10pt'}
                name='password'
                type='password'
                placeholder='Password' _placeholder={{ color: 'gray.500' }}
                onChange={handleChange}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg={"gray.50"}
                mb={2}
            />
            {<Text color={'red.500'} textAlign={'center'}>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>}
            <Button width={'100%'} height={"36px"} mt={2} mb={2} type='submit' isLoading={loading}>
                Log In
            </Button>
           
            <Flex fontSize={'9pt'} justifyContent={"center"} >
                <Text mr={1}>Forgot password ?</Text>
                <Text color={"blue.500"} fontWeight={700} cursor={"pointer"} onClick={() => setAuthModal(prev => ({
                    ...prev, view: 'resetPassword'
                }))}>Reset</Text>

            </Flex>
            <Flex fontSize={'9pt'} justifyContent={"center"} >
                <Text mr={1}>New here ?</Text>
                <Text color={"blue.500"} fontWeight={700} cursor={"pointer"} onClick={() => setAuthModal(prev => ({
                    ...prev, view: 'signup'
                }))}>Sign Up</Text>

            </Flex>
        </form>
    )
}
export default Login;