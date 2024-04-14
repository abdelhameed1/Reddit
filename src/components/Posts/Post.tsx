import { PostType } from '@/atoms/postsAtom';
import { Alert, AlertIcon, Flex, Icon, Image, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
} from "react-icons/io5";




type PostProps = {
    post: PostType,
    userIsCreator: boolean,
    userVoteValue?: number,
    onVote: (post: PostType , vote: number , communityId : string) => void,
    onDeletePost: (post: PostType) => Promise<boolean>,
    onSelectPost: () => void
};

const Post: React.FC<PostProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {
    const [loadingImage, setLoadingImage] = React.useState<boolean>(true)
    const [loadingDelete, setLoadingDelete] = React.useState<boolean>(false)
    const [error, setError] = React.useState(false)
    const handleDelete = async () => {
        setLoadingDelete(true)
        try {
            const success = await onDeletePost(post);
            if (!success) throw new Error('Failed to delete post')
        } catch (e: any) {
            setError(e.message)
        }
        setLoadingDelete(false)
    }
    return (
        <Flex border='1px solid' bg={'white'} borderColor={'gray.300'} borderRadius={4} _hover={{ borderColor: 'gray.500' }} cursor={'pointer'}>
            <Flex direction={'column'} align={'center'} bg={'gray.100'} p={2} width={'40px'} borderRadius={4}>
                <Icon as={userVoteValue == 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue == 1 ? 'brand.100' : 'gray.400'}
                    fontSize={21}
                    onClick={()=> onVote(post, 1, post.communityId)}
                    cursor={'pointer'}
                />
                <Text fontSize={'9pt'}> {post.voteStatus}</Text>
                <Icon as={userVoteValue == -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue == -1 ? '#4379ff' : 'gray.400'}
                    fontSize={21}
                    onClick={()=> onVote(post, -1, post.communityId)}
                    cursor={'pointer'}
                />
            </Flex>
            <Flex direction={'column'} width={'100%'}>
            {
                error && (
                    <Alert status='error'>
                        <AlertIcon />
                        <Text>{error}</Text>
                        
                    </Alert>
                )
            }
                <Stack spacing={1} p={'10px'}>
                    <Stack direction={'row'} spacing={.6} align={'center'} fontSize={'9pt'}>
                        <Text>Posted By u/{post.creatorDisplayName} {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</Text>
                    </Stack>
                    <Text fontSize={'12pt'} fontWeight={'600'}>{post.title}</Text>
                    <Text fontSize={'10pt'} fontWeight={'600'}>{post.body}</Text>
                    {post.imageUrl && (
                        <Flex justify={'center'} align={'center'} p={2}>
                            {loadingImage && (<Skeleton height={200} width={'100%'} borderRadius={4} />)}
                            <Image src={post.imageUrl} maxHeight={'460px'} alt={post.title} display={loadingImage ? 'none' : 'unset'} onLoad={() => setLoadingImage(false)} />
                        </Flex>
                    )}
                </Stack>
                <Flex ml={1} mb={.5} color={'gray.500'} >
                    <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                        <Icon as={BsChat} mr={2} />
                        <Text fontSize={'9pt'}>{post.numberOfComments}</Text>
                    </Flex>
                    <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                        <Icon as={IoArrowRedoOutline} mr={2} />
                        <Text fontSize={'9pt'}>Share</Text>
                    </Flex>
                    <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                        <Icon as={IoBookmarkOutline} mr={2} />
                        <Text fontSize={'9pt'}>Save</Text>
                    </Flex>
                    {
                        userIsCreator && (
                            <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ color: 'red.500' }} cursor={'pointer'} onClick={handleDelete}>
                                {
                                    loadingDelete ? (<Spinner size="sm" />) : (<>
                                        <Icon as={AiOutlineDelete} mr={2} />
                                        <Text fontSize={'9pt'}>Delete</Text>
                                    </>)
                                }
                            </Flex>
                        )
                    }
                </Flex>
            </Flex>

        </Flex>
    )
}
export default Post;