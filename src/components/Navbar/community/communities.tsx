import { communityState } from '@/atoms/communitiesAtom';
import CreateCommunity from '@/components/Modal/community/createCommunity';
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import React from 'react';
import { GrAdd} from 'react-icons/gr';
import {  useRecoilValue } from 'recoil';
import CommunityListItem from './CommunityListItem';
import { FaReddit } from 'react-icons/fa';


const Communities:React.FC = () => {
    const [open, setOpen] = React.useState(false)
    const mySnippets = useRecoilValue(communityState).mySnippets
    return (
        <>
        <CreateCommunity open={open} handleClose={()=> setOpen(false)}/>
        <Box mt={3} mb={4} >
            <Text pl={3} mb={1} fontSize={'7pt'} fontWeight={500} color={'gray.500'}>
                Moderating
            </Text>
        {
            mySnippets.filter(snipp => snipp.isModerator).map(snipp =>(
                <CommunityListItem key={snipp.communityId} icon={FaReddit} displayText={`r/${snipp.communityId}`} link={`/r/${snipp.communityId}`} iconColor="brand.100" imageUrl={snipp.imageURL}/>
            ))
        }
        </Box>
        <Box mt={3} mb={4} >
            <Text pl={3} mb={1} fontSize={'7pt'} fontWeight={500} color={'gray.500'}>
                My Communities
            </Text>
            <MenuItem width={'100%'} fontSize={'10pt'} _hover={{bg:'grey.100'}} onClick={()=>{setOpen(true)}}>
        <Flex align={'center'}>
            <Icon as={GrAdd} fontSize={20} mr={2}/>
                Create Community
            
        </Flex>
        </MenuItem>
        {
            mySnippets.map(snipp =>(
                <CommunityListItem key={snipp.communityId} icon={FaReddit} displayText={`r/${snipp.communityId}`} link={`/r/${snipp.communityId}`} iconColor="blue.500" imageUrl={snipp.imageURL}/>
            ))
        }
        </Box>
        
        </>
    )
}
export default Communities;