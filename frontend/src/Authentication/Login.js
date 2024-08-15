
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input,InputGroup,InputRightElement } from "@chakra-ui/input";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState();
    const toast = useToast();
    const history = useHistory();
  
    const handleClick = () => setShow(!show)
    const postDetails = (pic) =>{
  
    }
    const submitHandler = async()=> {
        setLoading(true);
        if(!email||!password){
            toast({
                title: "Please fill in all the required fields.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setLoading(false);
              return;

        }
        try{
            const config = {
                headers:{
                    "Content-type": "application/json",
    
                }
            };
            const {data} = await axios.post("/api/user/login",{email,password},config);
            toast({
                title: "Login successfull.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              localStorage.setItem("UserInfo",JSON.stringify(data));
              setLoading(false);
              history.push("/chats");
            } catch(error){
                toast({
                    title: "Error Occured.",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                  });
                  setLoading(false);
            }

  
    }
    return (
      <VStack spacing="5px" color="black">
        <FormControl id="Email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input
           type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width = "4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
          </Button>
          </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
        colorScheme="blue"
        width="100%"
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}
        >
          Login
        </Button>
        <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={()=> {
            setEmail("gestexample@gmail.com")
            setPassword("123456")
        }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    );
}

export default Login
