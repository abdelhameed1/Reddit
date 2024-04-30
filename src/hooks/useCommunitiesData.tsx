import { AuthModalState } from '@/atoms/authModalAtom';
import { communityState , Community , CommunitySnippet} from '@/atoms/communitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDoc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';



const useCommunitiesData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue  , setCommunityStateValue ] = useRecoilState(communityState);
    const  setModalState = useSetRecoilState(AuthModalState);
    const router = useRouter();

    const [loading , setLoading] = React.useState(false);
    const [error , setError] = React.useState('');
    const joinCommunity = async (community:Community) => {
        try{
            setLoading(true);
            if(!user) {
                setModalState(prev => ({...prev , open:true , view:'login'}))
                return
            }
            const batch = writeBatch(firestore);
            const newSnippet:CommunitySnippet = {
                communityId:community.id,
                imageURL:community.imageURL ? community.imageURL : '',
                isModerator : user.uid === community.creatorId
                
            }
            batch.set(doc(firestore , `users/${user?.uid}/communitySnippets`,community.id),newSnippet)
            batch.update(doc(firestore, `communities/${community.id}`),{
                numberOfMembers: increment(1)
            })  
            await batch.commit();
            setCommunityStateValue(prev => ({...prev , mySnippets:[...prev.mySnippets,newSnippet]}))
            setLoading(false);
        }catch(e:any){
            console.log('joinCommunityError',e)
            setError(e.message)
        }
    }
    const leaveCommunity = async (communityId:string) => {
        try{
            setLoading(true);
            const batch = writeBatch(firestore);
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`,communityId))
            batch.update(doc(firestore, `communities/${communityId}`),{
                numberOfMembers: increment(-1)
            })
            await batch.commit();
            setCommunityStateValue(prev => ({...prev , mySnippets:prev.mySnippets.filter(snippet => snippet.communityId !== communityId)}))
            setLoading(false);
        }catch(e:any){
            console.log('leaveCommunityError',e)
            setError(e.message)
        }

    }
    const getSnippets = async () => {
        try{
            setLoading(true);
           const snippetDocs = await getDocs(collection(firestore , `users/${user?.uid}/communitySnippets`))
           const snippets = snippetDocs.docs.map((doc) => ({...doc.data()}));
           setCommunityStateValue(prev => ({...prev , mySnippets:snippets as CommunitySnippet[], snippetsFetched:true }));
            
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
const getCommunityData = async (communityId : string)=>{
try{
    const communityDocRef = doc(firestore , 'communities',communityId);
    const communityDoc = await getDoc(communityDocRef);
    setCommunityStateValue(prev => ({
        ...prev , 
        currentCommunity : { id : communityDoc.id , ...communityDoc.data()} as Community

    }))
}catch(e:any){
    console.log('getCommunityDataError',e)
    setError(e.message)

}
}
   React.useEffect(() => {
    if(!user) {
        setCommunityStateValue(prev => ({...prev , mySnippets:[] , snippetsFetched:false}));
        return;
}
    getSnippets()
   },[user])

   
   React.useEffect(() => {
   const { communityId } = router.query;
    if(communityId && !communityStateValue.currentCommunity) getCommunityData(communityId as string)

   
   },[communityStateValue.currentCommunity , router.query])


    return {
        communityStateValue,
        loading,
        error,
        onJoinOrLeaveCommunity
    }
}
export default useCommunitiesData;