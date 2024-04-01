import { Community } from '@/atoms/communituesAtom';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
type PostsProps = {
    communityData : Community ,
};

const Posts:React.FC<PostsProps> = ({communityData }) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = React.useState<boolean>(false);

    const getPosts = async ()=>{
        try{
            const postsQuery = query(collection(firestore , 'posts'), where('communityId','==',communityData.id), orderBy('createdAt','desc'));
            const postsDocs = await getDocs(postsQuery);
            const posts = postsDocs.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            })
        }catch(e){
            console.log('getPostsError',e);
        
        }
    }

    useEffect(()=>{
        getPosts();
    },[])
    return <div>Have a good coding</div>
}
export default Posts;