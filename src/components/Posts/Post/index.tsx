import { Community } from '@/atoms/communituesAtom';
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
    }

    useEffect(() => {
        getPosts();
    }, [])
    return (
        <>
            {postStateValue.posts.map((post , index) => 
                (<Post post={post} 
                    key={index}
                userIsCreator={user?.uid == post.creatorId} 
                userVoteValue={undefined}  
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                />)
            )}
        </>
    )
}
export default Posts;