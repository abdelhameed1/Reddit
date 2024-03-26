import { Flex } from '@chakra-ui/react';
import React from 'react';
import TabItem from './TabItem';
import { formTabs } from '@/utils/formTabs';


type NewPostFormProps = {
    
};


const NewPostForm:React.FC<NewPostFormProps> = () => {
    const [activeTab, setActiveTab] = React.useState(formTabs[0].title)
    return (
        <Flex  bg={'white'} borderRadius={4}>
            {
                formTabs.map((tab , index)=>(
                    <TabItem key={index} tab={tab} active={tab.title === activeTab} setActiveTab={setActiveTab}/>
                ))
            }
        </Flex>
    )
}
export default NewPostForm;