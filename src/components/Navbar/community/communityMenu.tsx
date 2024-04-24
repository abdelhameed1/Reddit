import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList,  Icon, Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { TiHome } from 'react-icons/ti';
import Communities from './communities';
import useMenu from '@/hooks/useMenu';


const UserMenu: React.FC = () => {
   const {menuState , toggleMenu} = useMenu();
    return <>
        <Menu isOpen={menuState.open}>
            <MenuButton 
            cursor={'pointer'}
             padding={'0px 6px'}
              borderRadius={4}
              _hover={{ outline: "1ps solid", outlineColor: "gray.200" }}
              mr={2}
              ml={{base:0 , md:2}}
              onClick={toggleMenu}
              >
                <Flex align={'center'} justify={'space-between'} width={{base:'auto' , lg:'flex'}}>
                    <Flex align={'center'}>
                        {menuState.selectedMenuItem.imageUrl ? <Image src={menuState.selectedMenuItem.imageUrl} alt={menuState.selectedMenuItem.displayText} borderRadius='full' boxSize={'24px'} mr={2}/> : <Icon as={menuState.selectedMenuItem.icon} mr={2} color={menuState.selectedMenuItem.IconColor}/>}
                        
                        <Flex display={{base:"none" , lg:'flex'}}>
                            <Text fontWeight={600} fontSize={'10pt'}>{menuState.selectedMenuItem.displayText}</Text>
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