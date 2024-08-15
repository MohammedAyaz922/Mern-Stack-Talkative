import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { useSelector,useDispatch} from "react-redux";
import { MenuList } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router";
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem"
import { setChats, setNotifications, setSelectedChat } from "../../actions/userActions";
import { getSender } from "../../config/chatLogics";
import NotificationBadge from "react-notification-badge"
import Effect from "react-notification-badge";


const SideDrawer = () => {
  const user = useSelector((state) => state.user.user);
  const chats = useSelector((state) => state.user.chats);
  const notifications = useSelector((state) => state.user.notifications);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch()
  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async (userId) => {
    if (!search) {
      toast({
        title: "Please enter username or email in the search.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
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

      const { data } = await axios.get(`/api/user?search=${search}`, config); 
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occurred",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChats = async(userId)=>{
    try{
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const {data} = await axios.post(`/api/chats`, { userId }, config);
      if(!chats.find((c)=> c._id === data._id)) dispatch(setChats([data, ...chats]));
      setLoading(false);
      dispatch(setSelectedChat(data));
      onClose();

    }catch (error) {
      toast({
        title: "Error fetching chats",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }

  }


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }} p="4px">
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="work sans">
        <Text mb='8px'>Talk-A-Tive</Text>
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
              count={notifications.length}
              effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1}></BellIcon>
            </MenuButton>
            <MenuList>{!notifications.length && "No New Notifications"}
              {notifications.map(notif =>(
                <MenuItem key={notif._id} onClick={()=> {
                  dispatch(setSelectedChat(notif.chat))
                  setNotifications(notifications.filter((n)=> n!==notif));
                  }}>
                  {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}`:`New Message from${getSender(user,notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search By Email Or Name"
                mr={2}
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
              />
              <Button onClick={ handleSearch}>Go</Button>
            </Box>
            {loading ? <ChatLoading /> :
            (
              searchResult?.map(user => (
                <UserListItem
                key = {user._id}
                user={user}
                selectedChatState
                setSelectedChatState
                handleFunction={()=> accessChats(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex"/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

