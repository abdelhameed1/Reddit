import { Community } from '@/atoms/communitiesAtom';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import usePosts from '@/hooks/usePosts';
type PostsProps = {
    communityData: Community,
};
import { PostType } from '@/atoms/postsAtom';
import Post from '../Post';
import { Stack } from '@chakra-ui/react';
import Loader from '../Loader';
const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = React.useState<boolean>(false);
    const { postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost } = usePosts();

    const getPosts = async () => {
        try {
            setLoading(true);
            const postsQuery = query(collection(firestore, 'posts'), where('communityId', '==', communityData.id), orderBy('createdAt', 'desc'));
            const postsDocs = await getDocs(postsQuery);
            const posts = postsDocs.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })

            setPostStateValue(prev => ({
                ...prev,
                posts: posts as PostType[]

            }))
        } catch (e) {
            console.log('getPostsError', e);

        }
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, [])
    return (
        <>
            {
                loading ? (<Loader />) : (
                    <Stack>
                        {postStateValue.posts.map((post, index) =>
                        (<Post post={post}
                            key={index}
                            userIsCreator={user?.uid == post.creatorId}
                            userVoteValue={undefined}
                            onVote={onVote}
                            onSelectPost={onSelectPost}
                            onDeletePost={onDeletePost}
                        />)
                        )}
                    </Stack>
                )
            }

        </>
    )
}
export default Posts;