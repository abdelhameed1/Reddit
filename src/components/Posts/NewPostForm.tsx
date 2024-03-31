import { Flex } from '@chakra-ui/react';
import React from 'react';
import TabItem from './TabItem';
import { formTabs } from '@/utils/formTabs';
import TextInput from './PostForm/TextInput';
import ImageUpload from './PostForm/ImageUpload';



type NewPostFormProps = {

};


const NewPostForm: React.FC<NewPostFormProps> = () => {
    const [activeTab, setActiveTab] = React.useState(formTabs[0].title)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [textInput, setTextInput] = React.useState({
        title: '',
        body: ''
    })
    const [selectFile, setSelectFile] = React.useState<string>('');

    const handleCreatePost = async () => {

    }

    const handleSelectImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if(e.target.files?.[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            if(readerEvent.target?.result) setSelectFile(readerEvent.target.result as string)
        }
     }
    const handleTextChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTextInput(prev =>({...prev, [name]:value }))
     }

    return (
        <Flex bg={'white'} borderRadius={4} mt={2} direction={'column'}>
            <Flex width={"100%"}>
                {
                    formTabs.map((tab, index) => (
                        <TabItem key={index} tab={tab} active={tab.title === activeTab} setActiveTab={setActiveTab} />
                    ))
                }
            </Flex>
            <Flex p={4}>
                {activeTab == 'Post' &&
                    <TextInput
                        textInput={textInput}
                        handleCreatePost={handleCreatePost}
                        onChange={handleTextChange}
                        loading={loading} />
                }
                {
                    activeTab == 'Images & Video' &&
                    <ImageUpload 
                    selectedFile={selectFile} 
                    onSelectFile={handleSelectImage} 
                    setSelectedFile={setSelectFile}
                    setSelectedTab={setActiveTab}
                    />
                }
            </Flex>
        </Flex>
    )
}
export default NewPostForm;