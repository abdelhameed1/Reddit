import PageContent from '@/components/Layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';


const SubmitPage:React.FC = () => {
    
    return (
        <PageContent>
            <>
            <Box p={'40px 0px'} borderBottom="1px solid" borderColor={'white'}>
                <Text>Create a Post</Text>
            </Box>
            <NewPostForm/>
            </>
            <></>
        </PageContent>
    )
}
export default SubmitPage;