import React from 'react';
import { Flex , Image } from '@chakra-ui/react';
import SearchInput from './searchInput';


const Navbar:React.FC = () => {
    
    return (
        <Flex bg="white" height={"44px"} padding={"6px 12px"}>
            <Flex align={'center'}>
                <Image height={'30px'} src='/images/redditFace.svg'/>
                <Image height={'44px'} src='/images/redditText.svg' display={{base : 'none' , md : 'unset'}}/>
            </Flex>
            <SearchInput  />
        </Flex>
    )
}
export default Navbar;