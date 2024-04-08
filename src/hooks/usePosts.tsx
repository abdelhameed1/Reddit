import { PostType, postState } from '@/atoms/postsAtom';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';



const usePosts = () => {
    const [postStateValue , setPostStateValue] = useRecoilState(postState);
    const onVote = async ()=>{}
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
            return false
            console.log('deletePostError', e.message)
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