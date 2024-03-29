import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList,  Icon, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { TiHome } from 'react-icons/ti';
import Communities from './communities';


const UserMenu: React.FC = () => {
   
    return <>
        <Menu>
            <MenuButton 
            cursor={'pointer'}
             padding={'0px 6px'}
              borderRadius={4}
              _hover={{ outline: "1ps solid", outlineColor: "gray.200" }}
              mr={2}
              ml={{base:0 , md:2}}
              >
                <Flex align={'center'} justify={'space-between'} width={{base:'auto' , lg:'flex'}}>
                    <Flex align={'center'}>
                        <Icon fontSize={24} mr={{base:1 , md:2}} as={TiHome}/>
                        <Flex display={{base:"none" , lg:'flex'}}>
                            <Text fontWeight={600} fontSize={'10pt'}>Home</Text>
                        </Flex>
                        

                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities/>

            </MenuList>
        </Menu>
    </>
}
export default UserMenu;