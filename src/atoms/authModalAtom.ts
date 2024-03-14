import {atom} from 'recoil';


export interface AuthModalState {
    open : boolean , 
    view : 'login' | 'signup' | 'resetPassword',
}

export type ModalView = "login" | "signup" | "resetPassword";

const defualtModalState : AuthModalState = {
    open : false , 
    view : 'login'
}

export const AuthModalState = atom<AuthModalState>({
    key : 'authModalState',
    default : defualtModalState,
})