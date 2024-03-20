import React from 'react';
import { Flex , Image } from '@chakra-ui/react';
import SearchInput from './searchInput';
import RightContent from './rightContent/rightContent';
import AuthModal from '../Modal/Auth/AuthModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import CommunityMenu from './community/communityMenu';

const Navbar:React.FC = () => {
    const [user ] = useAuthState(auth)
    return (
        <Flex bg="white"
         height={"44px"} 
         padding={"6px 12px"}
          >
            <Flex align={'center'}>
                <Image height={'30px'} src='/images/redditFace.svg'/>
                <Image height={'44px'} src='/images/redditText.svg' display={{base : 'none' , md : 'unset'}}/>
            </Flex>
            {user && <CommunityMenu/>}
            <AuthModal/>
            <SearchInput user={user} />
            <Flex style={{ marginLeft: 'auto' }} >
                 <RightContent user={user} />
            </Flex>
           
        </Flex>
    )
}
export default Navbar;