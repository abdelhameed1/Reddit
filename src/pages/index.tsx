
import PageContent from "@/components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import React from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import usePosts from "@/hooks/usePosts";
import { PostType } from "@/atoms/postsAtom";
import Loader from "@/components/Posts/Loader";
import { Stack } from "@chakra-ui/react";
import Post from "@/components/Posts/Post";
import CreatePostLink from "@/components/Modal/community/createPostLink";
import useCommunitiesData from "@/hooks/useCommunitiesData";




export default function Home() {
  const [user , loadingUser] = useAuthState(auth);
  const [loading , setLoading] = React.useState(false);

  const {postStateValue, setPostStateValue , onSelectPost , onDeletePost , onVote} = usePosts();
  const {communityStateValue}= useCommunitiesData();
  
  const buildUserHomeFeed = async ()=>{
    setLoading(true);
    try{
      if(communityStateValue.mySnippets.length) {
        const myCommmunityIds = communityStateValue.mySnippets.map(snippet => snippet.communityId);
        const postQuery = query(collection(firestore,'posts'),where('communityId','in',myCommmunityIds),orderBy('voteStatus','desc'));
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map(doc=>({id : doc.id , ...doc.data()}));
        setPostStateValue(prev => ({
          ...prev , 
          posts : posts as PostType[]
        
        }))
      }else {
        buildNoUserHomeFeed();
      }
    }catch(e:any){
      console.log('Error in buildUserHomeFeed' , e.message)
    
    }
    setLoading(false);
  }


  const buildNoUserHomeFeed = async ()=>{
    setLoading(true);
    try{
      const postQuery = query(collection(firestore,'posts'),orderBy('voteStatus','desc'));
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map(doc=>({id : doc.id , ...doc.data()}));
      setPostStateValue(prev =>({
        ...prev , 
        posts :posts as PostType[]
      }))
    }catch(e:any){
      console.log('Error in buildNoUserHomeFeed' , e.message)
    }
    setLoading(false);
  }
  const getUserPostVotes = () =>{}

  React.useEffect(()=>{
    if(communityStateValue.snippetsFetched) buildUserHomeFeed();   
  },[communityStateValue.mySnippets])
  
  React.useEffect(()=>{
    if(!user && !loadingUser) buildNoUserHomeFeed();    
  },[user , loadingUser])
  
  return (
    <PageContent>

      <>
      <CreatePostLink/>
      {
        loading ? (<Loader/>) :(
          <Stack>
            {
              postStateValue.posts.map((post , index)=> (
              <Post 
              key={post.id} 
              post={post} 
              onVote={onVote} 
              onDeletePost={onDeletePost} 
              onSelectPost={() => onSelectPost(post , index)} 
              userVoteValue={postStateValue.postVotes.find(x => x.postId === post.id)?.voteValue}  
              userIsCreator={user?.uid === post.creatorId} 
              HomePage={true}
              />))
            }
          </Stack>
        )

      }
      </>
      <>
      
      </>
    </PageContent>
  );
}
