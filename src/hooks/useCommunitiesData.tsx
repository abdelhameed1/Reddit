import { communityState , Community , CommunitySnippet} from '@/atoms/communituesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';



const useCommunitiesData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue  , setCommunityStateValue ] = useRecoilState(communityState);
    const [loading , setLoading] = React.useState(false);
    const [error , setError] = React.useState('');
    const joinCommunity = (community:Community) => {}
    const leaveCommunity = (communityId:string) => {}
    const getSnippets = async () => {
        try{
            setLoading(true);
           const snippetDocs = await getDocs(collection(firestore , `users/${user?.uid}/communitySnippets`))
           const snippets = snippetDocs.docs.map((doc) => ({...doc.data()}));
           setCommunityStateValue(prev => ({...prev , mySnippets:snippets as CommunitySnippet[] }));
            
        }catch(e:any){
            console.log('getSnippetsError',e)
            setError(e.message)
        }
        setLoading(false);
    }
    const onJoinOrLeaveCommunity = (community : Community , isJoin:boolean) => {
        if(isJoin){
            leaveCommunity(community.id);
            return
    }
    joinCommunity(community);
}
   React.useEffect(() => {
    if(!user) return;
    getSnippets()
   },[user])

   
    return {
        communityStateValue,
        loading,
        onJoinOrLeaveCommunity
    }
}
export default useCommunitiesData;