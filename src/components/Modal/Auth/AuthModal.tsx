import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { AuthModalState } from '../../../atoms/authModalAtom';
import AuthInputs from './AuthInputs';


const AuthModal:React.FC= () => {
    
    const [modalState , setModalState] = useRecoilState(AuthModalState);
    const handleClose = () => {
      setModalState(prev => ({...prev , open : false}))}
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          
          <ModalHeader textAlign={'center'}>
            {modalState.view === "login" && 'login' }
            {modalState.view === 'signup' && 'Sign Up' }
            {modalState.view === 'resetPassword' && 'Reset Password' }
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} pb={6}>
            <Flex direction={'column'} align={'center'} justify={'center'} width={'70%'}>
             <AuthInputs/>
             {/* <OAuthButtons/>
              
              <ResetPassword/> */}
            </Flex>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;