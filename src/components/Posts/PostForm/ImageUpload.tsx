import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

type ImageUploadProps = {
    
};

const ImageUpload:React.FC<ImageUploadProps> = () => {
    const selectedFileRef = React.useRef<HTMLInputElement>(null);
    return (
        <Flex justify="center" align='center' width='100%' >
            <Flex justify="center" align='center' width='100%' p={20} border={'1px dashed'} borderColor={'gray.200'} w="100%" borderRadius={4}>
                <Button variant={'outline'} height={'28px'} onClick={()=>selectedFileRef.current?.click()}>Upload</Button>
                <input ref={selectedFileRef} type='file' hidden/>
            </Flex>
        </Flex>
    )
}
export default ImageUpload;