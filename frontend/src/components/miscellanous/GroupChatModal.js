import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../actions/userActions";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

function GroupChatModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedChat, chats, user } = useSelector((state) => ({
    chats: state.user.chats,
    user: state.user.user,
  }));

  const toast = useToast();
  const dispatch = useDispatch();
  const handleDelete = (deletedUser) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== deletedUser._id)
    );
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

  const handleGroup = (usertoAdd) => {
    if (selectedUsers.includes(usertoAdd)) {
      toast({
        title: "User Already addedd",
        description: "Failed to Load the Search Results",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setSelectedUsers([...selectedUsers, usertoAdd]);
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill in all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chats/group`,{
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((user) => user._id)),
      },
      config
    );
      dispatch(setChats([data, ...chats]));
      onClose();
      toast({
        title: "New Group Chat Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

    } catch(e) {
        toast({
            title: "Failed to create a chat",
            description: e.response.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });

    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <div>loading</div>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
