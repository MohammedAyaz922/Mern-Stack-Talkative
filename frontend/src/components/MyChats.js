import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setSelectedChat, setChats } from "../actions/userActions";
import { useToast, Button, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { useDispatch } from "react-redux";
import { getSender } from "../config/chatLogics";
import GroupChatModal from "./miscellanous/GroupChatModal";

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, chats, user } = useSelector((state) => ({
    selectedChat: state.user.selectedChat,
    chats: state.user.chats,
    user: state.user.user,
  }));

  const dispatch = useDispatch();

  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chats", config);
      dispatch(setChats(data));
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("UserInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box  
      display={{ base: selectedChat && selectedChat._id? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              
              <Box
                onClick={() => dispatch(setSelectedChat(chat))}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat ? (
                    getSender(loggedUser,chat.users)
                  ):(chat.chatName)}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
