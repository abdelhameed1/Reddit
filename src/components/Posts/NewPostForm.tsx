import { Alert, AlertIcon,  Flex, Text } from '@chakra-ui/react';
import React from 'react';
import TabItem from './TabItem';
import { formTabs } from '@/utils/formTabs';
import TextInput from './PostForm/TextInput';
import ImageUpload from './PostForm/ImageUpload';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Post } from '@/atoms/postsAtom';
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';




type NewPostFormProps = {
    user: User
};


const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
    const router = useRouter();
    const { communityId } = router.query;
    const [activeTab, setActiveTab] = React.useState(formTabs[0].title)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [textInput, setTextInput] = React.useState({
        title: '',
        body: ''
    })
    const [selectFile, setSelectFile] = React.useState<string>('');
    const [error, setError] = React.useState<Boolean>(false)
    const handleCreatePost = async () => {
        const post: Post = {
            communityId: communityId as string,
            creatorId: user.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInput.title,
            body: textInput.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp
        }
        setLoading(true)
        try {
            const postDocRef = await addDoc(collection(firestore, 'posts'), post)
            if (selectFile) {
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectFile, 'data_url')
                const downloadUrl = await getDownloadURL(imageRef)
                await updateDoc(postDocRef, { imageUrl: downloadUrl })
            }
        } catch (error) {
            setError(true)
            console.log('posting error', error)
        }
        setLoading(false)
        router.back()
    }

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.target.files?.[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) setSelectFile(readerEvent.target.result as string)
        }
    }
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTextInput(prev => ({ ...prev, [name]: value }))
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
            {
                error && (
                    <Alert status='error'>
                        <AlertIcon />
                        <Text>Error while creating post</Text>
                        
                    </Alert>
                )
            }
        </Flex>
    )
}
export default NewPostForm;