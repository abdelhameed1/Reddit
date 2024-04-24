import useMenu from '@/hooks/useMenu';
import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

type communityListItemProps = {
    displayText : string,
    link : string,
    icon : IconType,
    iconColor : string,
    imageUrl ? : string
};

const CommunityListItem:React.FC<communityListItemProps> = ({ displayText , link , icon , iconColor , imageUrl}) => {
    const { onSelectedMenuItem} = useMenu()
    return (
        <MenuItem width={'100%'} fontSize={'10pt'} _hover={{bg:'gray.100'}} onClick={()=>onSelectedMenuItem({ displayText , link , icon , IconColor : iconColor , imageUrl})}>
            <Flex align={'center'}>
                {imageUrl ? <Image src={imageUrl} alt={displayText} borderRadius='full' boxSize={'10px'} mr={2}/> : <Icon as={icon} mr={2} color={iconColor}/>}
                {displayText}
            </Flex>
        </MenuItem>
    )
}
export default CommunityListItem;