import { communityState } from '@/atoms/communitiesAtom';
import { MenuItem, menuState } from '@/atoms/menuItem';
import { useRouter } from 'next/router';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';



const useMenu = () => {
    const [menuAtom , setMenuAtom] = useRecoilState(menuState);
    const router = useRouter();
    const communityStateValue = useRecoilValue(communityState);
    
    const toggleMenu = () => {
        setMenuAtom(prev => ({...prev , open : !menuAtom.open}))
    }


    const onSelectedMenuItem = (menuItem : MenuItem) => {
        setMenuAtom(prev => ({
            ...prev,
            selectedMenuItem : menuItem
        }))
        router.push(menuItem.link)
        if(menuAtom.open) toggleMenu()
            
    }

    React.useEffect(() => {
        const {currentCommunity} = communityStateValue;
        if(currentCommunity) {
            setMenuAtom(prev => ({
                ...prev,
                onSelectedMenuItem : {
                    displayText : `r/${currentCommunity.id}`,
                    link : `/r/${currentCommunity.id}`,
                    imageUrl : currentCommunity.imageURL,
                    icon : FaReddit,
                    IconColor : 'red.500'
                }
            }))
        }
    },[communityStateValue.currentCommunity])
    return{
       menuState: menuAtom,
         toggleMenu,
         onSelectedMenuItem
    }
}
export default useMenu;