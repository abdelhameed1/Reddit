import { postState } from '@/atoms/postsAtom';
import React from 'react';
import { useRecoilState } from 'recoil';



const usePosts = () => {
    const [postStateValue , setPostStateValue] = useRecoilState(postState);
    const onVote = async ()=>{}
    const onSelectPost = ()=>{}
    const onDeletePost = ()=>{}
    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;