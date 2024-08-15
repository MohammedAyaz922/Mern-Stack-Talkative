// src/Pages/ChatPage.js
import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import SideDrawer from '../components/miscellanous/SideDrawer';
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';


const ChatPage = () => {
  const user = useSelector((state) => state.user.user);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer />}
      <Box
      display='flex'
      justifyContent='space-between'
      w='100%'
      h='91.5vh'
      p='10px'
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default ChatPage;
