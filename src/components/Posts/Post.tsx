import { PostType } from '@/atoms/postsAtom';
import { Alert, AlertIcon, Flex, Icon, Image, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    onVote: (e : React.MouseEvent<SVGElement , MouseEvent>,post: PostType, vote: number, communityId: string) => void,
    onDeletePost: (post: PostType) => Promise<boolean>,
    onSelectPost?: (post: PostType) => void,
    HomePage? : boolean
};

const Post: React.FC<PostProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost , HomePage }) => {
    const [loadingImage, setLoadingImage] = React.useState<boolean>(true)
    const [loadingDelete, setLoadingDelete] = React.useState<boolean>(false)
    const [error, setError] = React.useState(false)

    const singlePostPage = !onSelectPost
    const router = useRouter()   
    const handleDelete = async (e : React.MouseEvent<HTMLDivElement , MouseEvent>) => {
        e.stopPropagation()
        setLoadingDelete(true)
        try {
            const success = await onDeletePost(post);
            if (!success) throw new Error('Failed to delete post')
            router.push(`/r/${post.communityId}`)
        } catch (e: any) {
            setError(e.message)
        }
        setLoadingDelete(false)
    }
    return (
        <Flex border='1px solid' bg={'white'} borderColor={singlePostPage ? 'white':'grey.300'} borderRadius={singlePostPage ? '4px 4px 0px 0px' : '4px'} _hover={{ borderColor: singlePostPage? 'none': 'gray.500' }} cursor={singlePostPage ? 'unset' : 'pointer'} onClick={() => onSelectPost && onSelectPost(post)}>
            <Flex direction={'column'} align={'center'} bg={singlePostPage ? 'none':'gray.100'} p={2} width={'40px'} borderRadius={singlePostPage ? '0':'3px 0px 0px 3px'}>
                <Icon as={userVoteValue == 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue == 1 ? 'brand.100' : 'gray.400'}
                    fontSize={21}
                    onClick={(e) => onVote(e,post, 1, post.communityId)}
                    cursor={'pointer'}
                />
                <Text fontSize={'9pt'}> {post.voteStatus}</Text>
                <Icon as={userVoteValue == -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue == -1 ? '#4379ff' : 'gray.400'}
                    fontSize={21}
                    onClick={(e) => onVote(e,post, -1, post.communityId)}
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
                        {HomePage && (
                        <>
                        {
                            post.communityImageUrl ? (<Image src={post.communityImageUrl} boxSize={'18px'} mr={2} borderRadius={'full'} />) : (<Icon as={FaReddit} fontSize={'18pt'} mr={1} color={'blue.500'}/>)
                        }
                        <Link href={`r/${post.communityId}`}  ><Text fontWeight={700} _hover={{textDecoration : 'underline'}} onClick={e=> e.stopPropagation()}>{`r/${post.communityId}`} </Text></Link>
                        <Icon as={BsDot} color={'grey.500'} fontSize={8}/>
                        </>) }
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
                            <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ color: 'red.500' }} cursor={'pointer'} onClick={(e)=> handleDelete(e)}>
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