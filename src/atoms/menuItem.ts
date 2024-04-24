
import { IconType } from 'react-icons';
import { TiHome } from 'react-icons/ti';
import {atom} from 'recoil';
export type MenuItem ={
    displayText : string,
    link : string,
    icon : IconType,
    IconColor : string,
    imageUrl ? : string

}
interface MenuState {
    open: boolean;
    selectedMenuItem :MenuItem ;
}

export const defaultMenuItem:MenuItem = {
    displayText : 'Home',
    link : '/',
    icon : TiHome,
    IconColor : 'black'
}

export const defaultMenuState : MenuState = {
    open : false,
    selectedMenuItem : defaultMenuItem
}

export const menuState = atom({
    key : "menuState",
    default : defaultMenuState
})