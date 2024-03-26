import React from 'react';
import { tabItem } from '@/utils/formTabs';
import { Flex, Icon, Text } from '@chakra-ui/react';

type tabItemProps = {
    tab: tabItem,
    active : boolean,
    setActiveTab : (value : string)=>void
};

const TabItem:React.FC<tabItemProps> = ({tab , active , setActiveTab}) => {
    
    return (
        <Flex 
        justify={'center'} 
        align={'center'} 
        flexGrow={1} 
        p={'14px 0px'} 
        fontWeight={700}
        cursor={'pointer'} 
        _hover={{bg:'gray.50'}}
        color={active ? 'blue.500' : 'gray.500'}
        borderWidth={active ? '0px 1px 2px 0px' : '0px 1px 1px 0px'}
        borderBottomColor={active ? 'blue.500' : 'gray.500'}
        borderRightColor={'gray.200'}
        onClick={()=>setActiveTab(tab.title)}
        >
            <Flex align={'center'} height={'20px'} mr={2}>
                <Icon as={tab.icon}/>
            </Flex>
            <Text fontSize={'10pt'}>{tab.title}</Text>
        </Flex>
    )
}
export default TabItem;