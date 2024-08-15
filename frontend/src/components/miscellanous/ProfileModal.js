import React from 'react'
import { IconButton, useDisclosure, Text} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useSelector } from "react-redux";
import { Image } from '@chakra-ui/react';

const ProfileModal = ({children,user}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();


  return (
    <>
      {children ?( <span onClick={onOpen}>{children}</span>) :
      (<IconButton display={{base :"flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}
      />)}
      <Modal isOpen={isOpen} onClose={onClose}  isCentered>
        <ModalOverlay />
        <ModalContent height="400px">
          <ModalHeader 
          fontSize="40px"
          fontFamily="work sans"
          display="flex"
          justifyContent="center"
          >{user?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"

          >
            <Image
            borderRadius="full"
            boxSize="150px"
            src = {user?.pic}
            alt={user?.name}
            />
            <Text 
            fontFamily="work sans"
            fontSize={{base:"28px",md:"30px"}}
            >
                Email:{user?.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
