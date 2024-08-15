import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure
} from "@chakra-ui/react";


function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [search,setSearch] = React.useState('')

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        variant="alwaysOpen"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        trapFocus={false}
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
      >
        {/* <DrawerOverlay /> */}
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." 
             value={search}
            onChange={(e)=> setSearch(e.target.value)} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
