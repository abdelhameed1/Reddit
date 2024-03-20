import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
//import { useSignInWithFacebook } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { User } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    //const [signInWithFacebook, userFb, loadingFb, errorFb] = useSignInWithFacebook(auth);

    const createUserDocument = async (user:User) => {
        const userRef = doc(firestore, 'users', user.uid )
        await setDoc(userRef,JSON.parse(JSON.stringify(user))) 
    }

    React.useEffect(() => {
        if(user){
            createUserDocument(user.user)
        }
    },[user])
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