
import About from '@/components/Community/About';
import PageContent from '@/components/Layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import { auth } from '@/firebase/clientApp';
import useCommunitiesData from '@/hooks/useCommunitiesData';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';



const SubmitPage: React.FC = () => {
    const [user] = useAuthState(auth);
   
   const {communityStateValue} = useCommunitiesData();
    return (
        <PageContent>
            {user ? (<>
                    <Box p={'40px 0px'} borderBottom="1px solid" borderColor={'white'}>
                        <Text>Create a Post</Text>
                    </Box>
                    <NewPostForm user={user} communityImageURL ={communityStateValue.currentCommunity?.imageURL} />
                </>) : (<>
                    <Text>Sign in to create a post</Text>
                </>)}
            
            <>
            {communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity}/>}
            </>
        </PageContent>
    )
}
export default SubmitPage;