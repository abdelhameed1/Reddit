import { Community, communityState } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import CreatePostLink from '@/components/Modal/community/createPostLink';
import Posts from '@/components/Posts/Post/index';
import { useSetRecoilState } from 'recoil';
import About from '@/components/Community/About';


type  CommunityPageProps = {
    communityData : Community 
};

const  CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
   
    if (!communityData) {
        return  <NotFound/>  
    }
    const setCommunityStateValue = useSetRecoilState(communityState);
    React.useEffect(() => {
    setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: communityData
    }));
    
    },[])
    return (
        <>
        <Header communityData={communityData}/>
        <PageContent>
           <>
           <CreatePostLink/>
           <Posts communityData={communityData}/>
           </> 
            <About communityData={communityData}/> 
        </PageContent>
        </>
    )
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
    try{
        const communityDocRef= doc(firestore , 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);
        return {
            props: {
                communityData: communityDoc.exists() ? {id : communityDoc.id , ...JSON.parse(safeJsonStringify(communityDoc.data()))} : ''
            }
        }
    }catch(e){
        console.log('getServerSideError',e);
    }
}
export default  CommunityPage;