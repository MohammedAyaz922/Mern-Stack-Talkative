import React from "react";
import { connect } from "react-redux";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = ({ selectedChat, chats, user, fetchAgain,setFetchAgain }) => {

  const handleWidth = () => {
    if (selectedChat && selectedChat._id) {
      return { base: "flex", md: "flex" };
    } else {
      return { base: "none", md: "none" };
    }
  };

  return (
    <Box
      display={{ base: selectedChat._id ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  chats: state.user.chats,
  user: state.user.user,
  selectedChat: state.user.selectedChat,
});

export default connect(mapStateToProps)(ChatBox);
