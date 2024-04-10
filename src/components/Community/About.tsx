import { Community, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { Box, Button, Divider, Flex, Icon, IconButton, Image, Spinner, Stack, Text } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
type AboutProps = {
    communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {
    
    const [user] = useAuthState(auth)
    const selectedFileRef = React.useRef<HTMLInputElement>(null)
    const { onSelectFile, selectFile, setSelectFile } = useSelectFile()
    const [loading , setLoading] = React.useState(false)
    const setCommunityStateValue = useSetRecoilState(communityState)
    const updateImage = async () => {
        if(!selectFile) return
        setLoading(true)
        try {
            const imageRef = ref(storage,`communities/${communityData.id}/image`)
            await uploadString(imageRef, selectFile, 'data_url')
            const downloadUrl = await getDownloadURL(imageRef)
            await updateDoc(doc(firestore,'communities', communityData.id), {imageURL: downloadUrl})
            setCommunityStateValue(prev => ({
                ...prev,
                currentCommunity :{
                    ...prev.currentCommunity,
                    imageURL: downloadUrl
                } as Community
            }))
        } catch (error) {
            console.log('error updating image', error)
        }
        setLoading(false)
    }
    return (
        <Box position={'sticky'} top={'14px'}>
            <Flex justify={'space-between'} bg={'blue.400'} p={3} borderRadius={'4px 4px 0px 0px'} color={'white'}>
                <Text fontSize={'10pt'} fontWeight={700} > About Community</Text>
                <Icon as={HiOutlineDotsHorizontal} />
            </Flex>
            <Flex direction={'column'} p={3} bg={'white'} borderRadius={'0px 0px 4px 4px'}>
                <Stack>
                    <Flex width={'100%'} p={2} fontSize={'10pt'} fontWeight={700}>
                        <Flex direction={'column'} flexGrow={1}>
                            <Text> {communityData.numberOfMembers.toLocaleString()}</Text>
                            <Text>Members</Text>
                        </Flex>
                        <Flex direction={'column'} flexGrow={1}>
                            <Text>1</Text>
                            <Text>Online</Text>
                        </Flex>

                    </Flex>
                    <Divider />
                    <Flex align={'center'} width={'100%'} p={1} fontWeight={500} fontSize={'10pt'} >
                        <Icon as={RiCakeLine} fontSize={18} mr={2} />
                        {communityData.createdAt && <Text> Created {moment(new Date(communityData.createdAt?.seconds * 1000)).format('DD MMM, YYYY ')}</Text>}
                    </Flex>
                    <Link href={`/r/${communityData.id}/submit`}>
                        <Button mt={3} height={'30px'} width={'100%'}>Create Post</Button>
                    </Link>
                    {
                        user?.uid == communityData.creatorId && (
                            <>
                                <Divider />
                                <Stack spacing={1} fontSize={'10pt'}>
                                    <Text fontWeight={600} > Admin</Text>
                                    <Flex align={'center'} justify={'space-between'}>
                                        <Text color={'blue.500'} cursor={'pointer'} _hover={{ textDecoration: 'underline' }}
                                            onClick={() => selectedFileRef.current?.click()}
                                        >Change Image</Text>
                                        {
                                            communityData.imageURL || selectFile ? (
                                                <Image src={selectFile || communityData.imageURL} borderRadius={'full'} boxSize={'40px'} alt='community image' />
                                            ) : < Icon
                                                as={FaReddit}
                                                fontSize={40}
                                                color={'brand.500'}
                                                mr={2}
                                            />
                                        }
                                    </Flex>
                                        {selectFile && (
                                            loading ? <Spinner/> : <Text cursor={'pointer'} onClick={updateImage}> Save Changes</Text>
                                        )}
                                    <input type='file' ref={selectedFileRef} onChange={onSelectFile} accept='image/x-png,image/gif,image/jpeg' hidden={true}/>
                                </Stack>
                            </>
                        )
                    }
                </Stack>
            </Flex>
        </Box>
    )
}
export default About;