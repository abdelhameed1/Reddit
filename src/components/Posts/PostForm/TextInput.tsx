import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type TextInputProps = {
    textInput :{
        title:string,
        body:string
    }  
    onChange :(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
    handleCreatePost : ()=>void
    loading : boolean
};

const TextInput:React.FC<TextInputProps> = ({
    textInput,
    onChange,
    handleCreatePost,
    loading
}) => {
    
    return (
        <Stack spacing={3} width={'100%'}>
            <Input 
            name='title'
            value={textInput.title}
            onChange={onChange}
            fontSize={'10pt'}
            borderRadius={4}
            placeholder='Title'
            _placeholder={{color:'gray.500'}}
            _focus={{
                outline:'none',
                bg:'white',
                border:'1px solid',
                borderColor:'black'
            }}
            />
            <Textarea 
            name='body'
            value={textInput.body}
            onChange={onChange}
            height={'100px'}
            fontSize={'10pt'}
            borderRadius={4}
            placeholder='Text (Optional)'
            _placeholder={{color:'gray.500'}}
            _focus={{
                outline:'none',
                bg:'white',
                border:'1px solid',
                borderColor:'black'
            }}/>
            <Flex justify={'flex-end'}>
                <Button height={'34px'} padding={'0px 30px'} disabled={!textInput.title} onClick={handleCreatePost} isLoading={loading}>Post</Button>
            </Flex>
        </Stack>
    )
}
export default TextInput;