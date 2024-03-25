import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from './TabItem';

type NewPostFormProps = {
    
};

const formTabs =[
    {
        title : "Post",
        icon:IoDocumentText
    },
    {
        title : "Images & Video",
        icon : IoImageOutline
    },
    {
        title : "Link",
        icon : BsLink45Deg
    },
    {
        title : "Poll",
        icon : BiPoll
    },
    {
        title : "Talk",
        icon : BsMic
    }

]
export type tabItem ={
    title :string,
    icon : typeof Icon.arguments
}
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