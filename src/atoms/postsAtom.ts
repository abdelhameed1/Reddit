import { Timestamp } from 'firebase/firestore';
import {atom} from 'recoil';

export type PostType = {
    id?:string,
    communityId:string,
    creatorId : string,
    creatorDisplayName:string,
    title:string,
    body:string,
    numberOfComments:number,
    voteStatus:number,
    imageUrl?:string,
    communityImageUrl?:string,
    createdAt : Timestamp
}

interface PostState {
    selectedPost: PostType | null;
    posts: PostType[];
    
}

const defaultPostState : PostState = {
    selectedPost: null,
    posts: []
}

export const postState = atom<PostState>({
    key: 'postState',
    default: defaultPostState
})