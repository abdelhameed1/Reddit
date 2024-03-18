import CreateCommunity from '@/components/Modal/community/createCommunity';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { GrAdd} from 'react-icons/gr';
type communitiesProps = {
    
};

const Communities:React.FC<communitiesProps> = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <>
        <CreateCommunity open={open} handleClose={()=> setOpen(false)}/>
        <MenuItem width={'100%'} fontSize={'10pt'} _hover={{bg:'grey.100'}} onClick={()=>{setOpen(true)}}>
        <Flex align={'center'}>
            <Icon as={GrAdd} fontSize={20} mr={2}/>
                Create Community
            
        </Flex>
        </MenuItem>
        </>
    )
}
export default Communities;