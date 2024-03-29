import {  Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './authButtons';
import { User } from 'firebase/auth';
import Icons from './icons';
import Menu from './userMenu';

type RightContentProps = {
    user? : User|null
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
    
    return (
        <>
            <Flex justify={'center'} align={'center'}>
              {user ? <Icons/>:  <AuthButtons/>}
              <Menu user={user}/>
            </Flex>
        </>
    )
}
export default RightContent;