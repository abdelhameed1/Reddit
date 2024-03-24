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

interface CommunitySnippet {
    communityId : string;
    isModerator? : boolean;
    imageURL? : string;
}
interface CommunityState {
    mySnippets:CommunitySnippet[]
}

export const communityState = atom<CommunityState>({
    key: 'communityState',
    default: {
        mySnippets: []
    },

});