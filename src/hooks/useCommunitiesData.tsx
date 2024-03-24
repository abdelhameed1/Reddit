import { communityState , Community} from '@/atoms/communituesAtom';
import React from 'react';
import { useRecoilState } from 'recoil';



const useCommunitiesData = () => {
    const [communityStateValue  , setCommunityStateValue ] = useRecoilState(communityState);
    const joinCommunity = (community:Community) => {}
    const leaveCommunity = (communityId:string) => {}

    const onJoinOrLeaveCommunity = (community : Community , isJoin:boolean) => {

        if(isJoin){
            leaveCommunity(community.id);
            return
    }
    joinCommunity(community);
}
   
    return {
        communityStateValue,
        onJoinOrLeaveCommunity
    }
}
export default useCommunitiesData;