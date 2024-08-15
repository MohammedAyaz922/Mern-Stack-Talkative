import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  ModalOverlay,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { connect, useDispatch } from "react-redux";
import { setSelectedChat } from "../../actions/userActions";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import { FormControl, Input } from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

function UpdateGroupChatModal({
  selectedChat,
  fetchAgain,
  setFetchAgain,
  user,
  fetchMessages
}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRemove = async(user1) => {
    if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
        toast({
            title: "Only Admins can remove a user from the group",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        try {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
      
            const { data } = await axios.put(
              `/api/chats/groupremove`,
              {
                chatId: selectedChat._id,
                userId: user1._id,
              },
              config
            );
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            dispatch(setSelectedChat(data));
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
          } catch (error) {
            toast({
              title: "Error Occured.",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }

  };
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((user) => user._id === user1._id)) {
      toast({
        title: "Error Occured.",
        description: "User already exists in the Group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admins can add in the group.",
        description: "User already exists in the Group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chats/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chats/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error, "Error CATCH");

      toast({
        title: "Error Occured.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setRenameLoading(false);
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${searchQuery}`,
        config
      );
      setLoading(false);
      setSearchResults(data);
    } catch (e) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      >
        Open Modal
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl display="flex">
              <Input
                placeholder="Add user to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <div>loading</div>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  chats: state.user.chats,
  user: state.user.user,
  selectedChat: state.user.selectedChat,
});

export default connect(mapStateToProps)(UpdateGroupChatModal);
