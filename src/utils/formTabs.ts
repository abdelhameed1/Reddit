import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { Icon } from '@chakra-ui/react';

export const formTabs =[
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