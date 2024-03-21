import { Community } from '@/atoms/communituesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/components/Community/NotFound';
type  CommunityPageProps = {
    communityData : Community 
};

const  CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    
    if (!communityData) {
        return  <NotFound/>  
    }
    return (
        <>
        {communityData.id}
        </>
    )
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
    try{
        const communityDocRef= doc(firestore , 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);
        return {
            props: {
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify(communityDoc.data())) : ''
            }
        }
    }catch(e){
        console.log('getServerSideError',e);
    }
}
export default  CommunityPage;