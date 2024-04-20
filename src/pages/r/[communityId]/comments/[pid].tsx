import { PostType } from '@/atoms/postsAtom';
import About from '@/components/Community/About';
import PageContent from '@/components/Layout/PageContent';
import Comments from '@/components/Posts/Comments/Comments';
import Post from '@/components/Posts/Post';
import { auth, firestore } from '@/firebase/clientApp';
import useCommunitiesData from '@/hooks/useCommunitiesData';
import usePosts from '@/hooks/usePosts';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


const PostPage: React.FC = () => {
    const { postStateValue, onDeletePost, setPostStateValue, onVote } = usePosts()
    const {communityStateValue} = useCommunitiesData() 
    const [user] = useAuthState(auth)
    const router = useRouter()

    const fetchPost = async (postId : string)=>{
       try{
            const postDocRef = doc(firestore , 'posts',postId)
            const postDoc = await getDoc(postDocRef)
            setPostStateValue(prev => ({
                ...prev,
                selectedPost:{ id: postDoc.id , ...postDoc.data()} as PostType
            }))
       }catch(e){
           console.log('getsinglepost' , e)
       }
    }

    React.useEffect(() => {
        const { pid} = router.query
        if(!postStateValue.selectedPost && pid){
            fetchPost(pid as string)
        }
    }, [router.query , postStateValue.selectedPost])
    return (
        <PageContent>

            <>
                {
                    postStateValue.selectedPost && (
                        <Post
                            post={postStateValue.selectedPost}
                            onVote={onVote} onDeletePost={onDeletePost}
                            userVoteValue={postStateValue.postVotes.find(item => item.postId === postStateValue.selectedPost?.id)?.voteValue}
                            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}

                        />
                    )
                }
                <Comments user={user as User} selectedPost={postStateValue.selectedPost} communityId={postStateValue.selectedPost?.communityId as string}/>
            </>
            <>
            {communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity}/>}
            </>
        </PageContent>
    )
}
export default PostPage;