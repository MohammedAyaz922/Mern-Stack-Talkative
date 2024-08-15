import { Box, Container,Text,Tab,TabList,TabPanels,TabPanel,Tabs } from '@chakra-ui/react'
import React from 'react'
import Login from '../Authentication/Login'
import SignUp from '../Authentication/SignUp'
import { useHistory } from 'react-router'

const HomePage = () => {
  const history = useHistory ();
  return (
    <Container maxW='xl' centerContent>
     <Box d='flex'
     justifyContent='center'
     p={3}
     bg={"white"}
     w="100%"
     m="40px 0 15px 0"
     borderRadius="lg"
     borderWidth="1px"
     >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Talk-A-Tive</Text>
     </Box>
     <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black">
     <Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
    <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
     </Box>
    </Container>
  )
}

export default HomePage
