import { PostType, PostVote, postState } from '@/atoms/postsAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';



const usePosts = () => {
    const [postStateValue , setPostStateValue] = useRecoilState(postState);
    const [user] = useAuthState(auth);
    const onVote = async (post: PostType , vote: number , communityId : string)=>{
        
        try{
            const {voteStatus} = post;
            const existingVote = postStateValue.postVotes.find(v => v.postId === post.id)
            const batch = writeBatch(firestore);
            const updatedPost = {...post}
            const updatedPosts= [...postStateValue.posts]
            let updatedPostVotes = [...postStateValue.postVotes]
            let voteChange = vote

            if(!existingVote){
                const postVoteRef = doc(collection(firestore,'users',`${user?.uid}/postVotes`))
                const newVote : PostVote = {
                    id : postVoteRef.id,
                    postId : post.id!,
                    communityId ,
                    voteValue : vote
                }
                batch.set(postVoteRef,newVote)
                updatedPost.voteStatus = voteStatus + vote
                updatedPostVotes = [...updatedPostVotes,newVote]
            }else{
                const postVoteRef = doc(firestore,'users',`${user?.uid}/postVotes/${existingVote.id}`)
                if(existingVote.voteValue == vote){
                    updatedPost.voteStatus = voteStatus-vote;
                    updatedPostVotes = updatedPostVotes.filter(v => v.id !== existingVote.id)
                    batch.delete(postVoteRef)
                    voteChange *=-1
                }else{
                    updatedPost.voteStatus = voteStatus + (2*vote)
                    const voteIndex = postStateValue.postVotes.findIndex(v => v.id === existingVote.id)
                    updatedPostVotes[voteIndex]= {
                        ...existingVote,
                        voteValue:vote
                    }
                    voteChange = vote*2
                }
            }

            const postRef = doc(firestore,'posts',post.id!)
            batch.update(postRef,{
                voteStatus : voteStatus + voteChange
            })
            await batch.commit();

            const postIndex = postStateValue.posts.findIndex(p => p.id === post.id);
            updatedPosts[postIndex] = updatedPost;
            
            setPostStateValue(prev => ({
                ...prev,
                posts: updatedPosts,
                postVotes:updatedPostVotes
            }))
        }catch(e:any){
            console.log('voteError', e.message)

        }

    }
    const onSelectPost = ()=>{}
    const onDeletePost = async (post : PostType) : Promise<boolean>=>{
        try{
            if(post.imageUrl){
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef)
            }
            const postDocRef = doc(firestore,'posts',post.id!)
            await deleteDoc(postDocRef)

            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(p => p.id !== post.id)
            }))
           return true 
        }catch(e:any){
             console.log('deletePostError', e.message)
            return false
           
        }
        
    }
    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;