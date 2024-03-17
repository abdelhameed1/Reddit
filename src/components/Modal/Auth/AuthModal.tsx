import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,  Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { AuthModalState } from '../../../atoms/authModalAtom';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import ResetPassword from './ResetPassword';


const AuthModal: React.FC = () => {

  const [modalState, setModalState] = useRecoilState(AuthModalState);

  const [user, loading, error] = useAuthState(auth)

  const handleClose = () => { setModalState(prev => ({ ...prev, open: false })) }

  React.useEffect(() => {
    if (user) handleClose()
  }, [user])
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader textAlign={'center'}>
            {modalState.view === "login" && 'login'}
            {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} pb={6}>
            <Flex direction={'column'} align={'center'} justify={'center'} width={'70%'}>
              {
                (modalState.view === 'login' || modalState.view === 'signup') ?(
                  <>
                  <OAuthButtons />
              <Text color={'grey.500'}>OR</Text>
              <AuthInputs />
                  </>
                ): (<ResetPassword/> )
              }


              
            </Flex>
          </ModalBody>


        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;