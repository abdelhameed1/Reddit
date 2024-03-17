import { SearchIcon } from '@chakra-ui/icons';
import { Flex, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';

type searchInputProps = {
  user?: User |null
};

const SearchInput: React.FC<searchInputProps> = ({user}) => {

  return (
    <Flex flexGrow={1} maxWidth={user? 'auto' : '1000px'} mr={2} align={'center'}>
      <InputGroup>
        <InputLeftElement pointerEvents='none' >
          <SearchIcon color={'gray.300'} mb={1} />
        </InputLeftElement>
        <Input placeholder='Search Reddit' size="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{ outline: "none", border: "1px solid", borderColor: "blue.500" }}
          height={'34px'}
          bg={'gray.50'}
        />
      </InputGroup>

    </Flex>
  )
}
export default SearchInput;