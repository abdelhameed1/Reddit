import { PostType, postState } from '@/atoms/postsAtom';
import { Box, Flex, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import CommentInput from './CommentInput';
import { firestore } from '@/firebase/clientApp';
import { Timestamp, collection, doc, getDocs, increment, orderBy, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import CommentItem, { Comment } from './CommentItem';

type CommentsProps = {
    user: User,
    selectedPost: PostType | null,
    communityId: string
};


const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
    const [commentText, setCommentText] = React.useState<string>('')
    const [comments, setComments] = React.useState<Comment[]>([])
    const [createloading, setCreateLoading] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [loadingDelete, setLoadingDelete] = React.useState('')
    const setPostState = useSetRecoilState(postState)

    const onCreateCommnet = async () => {
        setCreateLoading(true)
        try {
            const batch = writeBatch(firestore);
            const commentDocRef = doc(collection(firestore, 'comments'))
            const newComment: Comment = {
                id: commentDocRef.id,
                creatorId: user.uid,
                creatorDisplayName: user.email!.split('@')[0],
                communityId: communityId,
                postId: selectedPost?.id!,
                postTitle: selectedPost?.title!,
                text: commentText,
                createdAt: serverTimestamp() as Timestamp
            }
            batch.set(commentDocRef, newComment)
            newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp
            const postDocRef = doc(firestore, 'posts', selectedPost?.id as string)
            batch.update(postDocRef, { numberOfComments: increment(1) })
            await batch.commit()
            setCommentText('')
            setComments(prev => [newComment, ...prev])
            setPostState((prev) => ({
                ...prev,
                selectedPost: {
                    ...prev.selectedPost,
                    numberOfComments: prev.selectedPost?.numberOfComments! + 1
                } as PostType
            }))
            setCreateLoading(false)
        }
        catch (error: any) {
            console.log('oncreatecomment', error)
        }
    }
    const onDeleteComment = async (comment: Comment) => {
        try{    
            setLoadingDelete(comment.id)
            const batch = writeBatch(firestore)
            const commenDocRef = doc(firestore,'comments',comment.id)
            batch.delete(commenDocRef)

            const postDocRef = doc(firestore,'posts',selectedPost?.id!)
            batch.update(postDocRef,{numberOfComments: increment(-1)})
             await batch.commit()
             setPostState(prev => ({
                ...prev,
                selectedPost:{
                    ...prev.selectedPost,
                    numberOfComments: prev.selectedPost?.numberOfComments! - 1
                } as PostType
             }))
             setComments(prev => prev.filter(item => item.id !== comment.id))
        }catch(e : any){    
            console.log('deletecomment', e)
        }
        setLoadingDelete('')
     }
    const getPostComments = async () => {
        try {
            const commentsQuery = query(collection(firestore, 'comments'), where('postId', '==', selectedPost?.id), orderBy('createdAt', 'desc'));
            const commentsDocs = await getDocs(commentsQuery)
            const comments = commentsDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setComments(comments as Comment[])
            setLoading(false)
        } catch (error: any) {
            console.log('getpostcomments', error)
        }
    }

    React.useEffect(() => {
        if (!selectedPost) return;
        getPostComments()
    }, [selectedPost])
    return (
        <Box bg={'white'} borderRadius={'0px 0px 4px 4px'} p={2}>
            <Flex direction={'column'} pl={10} pr={4} mb={6} fontSize={'10pt'} width={'100%'}>
                {!loading && <CommentInput comment={commentText} setComment={setCommentText} loading={createloading} user={user} onCreateComment={onCreateCommnet} />
                }
            </Flex>
            <Stack spacing={6} p={2}>
                {
                    loading ? (
                        <>
                            {[0, 1, 2].map((item) => (
                                <Box key={item} padding="6" bg="white">
                                    <SkeletonCircle size="10" />
                                    <SkeletonText mt="4" noOfLines={2} spacing="4" />
                                </Box>
                            ))}
                        </>
                    ) : (
                        <>
                            {comments.length === 0 ? (
                                <Flex
                                    direction="column"
                                    justify="center"
                                    align="center"
                                    borderTop="1px solid"
                                    borderColor="gray.100"
                                    p={20}
                                >
                                    <Text fontWeight={700} opacity={0.3}>
                                        No Comments Yet
                                    </Text>
                                </Flex>
                            ) : (
                                <>
                                    {
                                        comments.map((comment, index) => (
                                            <CommentItem comment={comment} onDeleteComment={onDeleteComment} loading={loadingDelete === comment.id ? true : false} userId={user?.uid} key={index} />
                                        ))
                                    }
                                </>
                            )}
                        </>
                    )
                }

            </Stack>
        </Box>
    )
}
export default Comments;