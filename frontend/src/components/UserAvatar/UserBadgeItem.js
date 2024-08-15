import React from 'react'
import { Box } from '@chakra-ui/layout'
import { CloseIcon } from '@chakra-ui/icons'

function UserBadgeItem({user,handleFunction}) {
  return (
    <Box
     px={2}
     py={1}
     borderRadius='lg'
     m={1}
     mb={2}
     fontStyle={12}
     backgroundColor="purple"
     color="white"
     cursor="pointer"
     onClick={handleFunction}

    >
        {user.name}
        <CloseIcon pl={1}/>
    </Box>
  )
}

export default UserBadgeItem
