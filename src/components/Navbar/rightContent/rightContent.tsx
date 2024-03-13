import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './authButtons';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

type RightContentProps = {
    user : any
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
    
    return (
        <>
            <Flex justify={'center'} align={'center'}>
              {user ? <Button onClick={()=> signOut(auth)}>Logout</Button>:  <AuthButtons/>}
            </Flex>
        </>
    )
}
export default RightContent;