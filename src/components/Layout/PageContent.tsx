import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    children: React.ReactNode
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {

    return (
        <Flex justify={'center'} p={'16px 0px'}>
            <Flex width={'95%'} justify={'center'} maxWidth={'860px'}>
                {/* left hand side of the layout  */}
                <Flex
                    direction={'column'}
                    width={{ base: '100%', md: '65%' }}
                    mr={{ base: 0, md: 6 }}
                >
                    {children && children[0 as keyof React.ReactNode]}

                </Flex>
                {/* Right hand side of the layout  */}
                <Flex
                    direction={'column'}
                    flexGrow={1}
                    display={{ base: 'none', md: 'flex' }}
                >

                    {children && children[1 as keyof React.ReactNode]}

                </Flex>
            </Flex>
        </Flex>
    )
}
export default PageContent;