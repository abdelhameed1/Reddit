import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
//import { useSignInWithFacebook } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    //const [signInWithFacebook, userFb, loadingFb, errorFb] = useSignInWithFacebook(auth);
    return (
        <Flex direction={'column'} width={'100%'} mb={4}>
            <Button variant={'oauth'} mb={2} onClick={() => signInWithGoogle()}>
                <Image src='/images/googlelogo.png' mr={4} height={'20px'}/>
                Conitue with Google
            </Button>
            {/* <Button variant={'oauth'} mb={2} onClick={() => signInWithFacebook()}>
                <Image src='/images/FbLogo.png' mr={4} height={'20px'}/>
                Conitue with Facebook
            </Button> */}
            {error && <Text>{error.message}</Text>}
        </Flex>
    );
};
export default OAuthButtons;