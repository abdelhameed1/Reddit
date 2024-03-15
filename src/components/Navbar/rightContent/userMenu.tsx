import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex, MenuDivider } from '@chakra-ui/react';
import { User, signOut } from 'firebase/auth';
import React from 'react';
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { auth } from '@/firebase/clientApp';
import { useRecoilState } from 'recoil';
import { AuthModalState } from '@/atoms/authModalAtom';
type userMenuProps = {
    user?: User | null
};

const UserMenu: React.FC<userMenuProps> = ({ user }) => {
    const [modalState, setModalState] = useRecoilState(AuthModalState);
    return <>
        <Menu>
            <MenuButton cursor={'pointer'} padding={'0px 6px'} borderRadius={4} _hover={{ outline: "1ps solid", outlineColor: "gray.200" }}>
                <Flex align={'center'} >
                    <Flex align={'center'}>
                        {user ? (

                            <Icon
                                fontSize={24}
                                mr={1}
                                color={'grey.300'}
                                as={FaRedditSquare} />
                        ) : (<Icon as={VscAccount} fontSize={24} color={'gray.400'} mr={1} />)}

                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                {
                    user ? (
                        <>
                            <MenuItem fontSize={'10pt'} fontWeight={700} _hover={{ bg: "blue.500", color: "white" }}>
                                <Flex align={'center'}>
                                    <Icon fontSize={20} mr={2} as={CgProfile} />
                                    Profile
                                </Flex>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem fontSize={'10pt'} fontWeight={700} _hover={{ bg: "blue.500", color: "white" }} onClick={() => signOut(auth)}>
                                <Flex align={'center'}>
                                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                                    Log Out
                                </Flex>
                            </MenuItem>
                        </>
                    ) :
                        <>
                            <MenuItem fontSize={'10pt'} fontWeight={700} _hover={{ bg: "blue.500", color: "white" }} onClick={() => setModalState({ open: true, view: "login" })}>
                                <Flex align={'center'}>
                                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                                    Log In / Sign Up
                                </Flex>
                            </MenuItem>
                        </>
                }

            </MenuList>
        </Menu>
    </>
}
export default UserMenu;