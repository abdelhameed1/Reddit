import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Community {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: 'public' | 'private' | 'restricted';
    createdAt?: Timestamp;
    imageURL?: string;
}

export interface CommunitySnippet {
    communityId : string;
    isModerator? : boolean;
    imageURL? : string;

}
interface CommunityState {
    mySnippets:CommunitySnippet[],
    currentCommunity?: Community,
    snippetsFetched: boolean
}
const defaultCommunityState : CommunityState ={
    mySnippets : [],
    currentCommunity : undefined,
    snippetsFetched : false

}

export const communityState = atom<CommunityState>({
    key: 'communityState',
    default: defaultCommunityState

});