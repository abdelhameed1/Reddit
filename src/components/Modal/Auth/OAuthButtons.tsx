import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';


const OAuthButtons:React.FC = () => {
    
    return (
        <Flex direction={'column'} width={'100%'} mb={4}>

            <Button variant={'oauth'} mb={2}>
                <Image src='/images/googlelogo.png' mr={4} height={'20px'}/>
                Conitue with Google
                </Button>
        </Flex>
    )
}
export default OAuthButtons;