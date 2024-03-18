import { Box, Button, Checkbox, Divider, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsFillEyeFill , BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
type createCommunityProps = {
    open: boolean,
    handleClose: () => void

};

const CreateCommunity: React.FC<createCommunityProps> = ({ open, handleClose }) => {
    const [communityName, setCommunityName] = React.useState('' as string)
    const [chars, setChars] = React.useState(21);
    const [communityType, setCommunityType] = React.useState('public' as string)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 21) return
        setCommunityName(e.target.value)
        setChars(21 - e.target.value.length)
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(e.target.name)
    }
    return (
        <>


            <Modal isOpen={open} onClose={handleClose} size={'lg'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} flexDirection={'column'} fontSize={15} padding={3}>Create a Community</ModalHeader>
                    <Box pl={3} pr={3}>
                        <Divider />
                        <ModalCloseButton />
                        <ModalBody display={'flex'} flexDirection={"column"} p={'10px 0px'}>
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color={'gray.500'}>
                                Community name can't be changed.
                            </Text>
                            <Text position={'relative'} top={'28px'} left={'10px'} width={'20px'} color={'gray.400'}>
                                r/
                            </Text>
                            <Input position={'relative'} value={communityName} size={'sm'} pl={'22px'} onChange={handleChange} />
                            <Text color={chars === 0 ? 'red' : "gray.500"}>{chars} Characters remaining</Text>
                            <Box mt={4} mb={4}>
                                <Text fontWeight={600} fontSize={15}>Community Type</Text>
                                <Stack>
                                    <Checkbox name='public'
                                        isChecked={communityType === 'public'}
                                        onChange={handleTypeChange}>
                                        <Flex  align={'center'}>
                                            <Icon as={BsFillPersonFill}/>
                                            <Text fontSize={'10pt'} mr={2}>Public</Text>
                                            <Text fontSize={'8pt'} color={'gray.500'} pt={1}>Anyone can view, post or comment to this community.</Text>
                                        </Flex>

                                    </Checkbox>
                                    <Checkbox
                                        name='restricted'
                                        isChecked={communityType === 'restricted'}
                                        onChange={handleTypeChange}  mr={2}>
                                        <Flex align={'center'}>
                                        <Icon as={BsFillEyeFill} color={'gray.500'} mr={2}/>
                                            <Text fontSize={'10pt'} mr={2}>Restricted</Text>
                                            <Text fontSize={'8pt'} color={'gray.500'} pt={1}>Anyone can view this community, but only approved users can post. </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name='private'
                                        isChecked={communityType === 'private'}
                                        onChange={handleTypeChange}>
                                        <Flex align={'center'}>
                                        <Icon as={HiLockClosed} color={'gray.500'} mr={2}/>
                                            <Text fontSize={'10pt'} mr={2}>Private</Text>
                                            <Text fontSize={'8pt'} color={'gray.500'} pt={1}>only approved user can view or post to this</Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>


                    <ModalFooter bg={'gray.100'} borderRadius={'0px 0px 10px 10px'}>
                        <Button variant={'outlined'} height={'30px'} mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button  height={'30px'} onClick={()=>{}}>Create community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}
export default CreateCommunity;