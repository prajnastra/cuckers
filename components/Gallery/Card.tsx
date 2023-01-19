import type { NextComponentType, NextPageContext } from 'next'
import { useState } from 'react'
import { Box, Text, Image } from '@chakra-ui/react'

interface CardProps {
  imageURL: string
  lable: string
}

const Card: NextComponentType<NextPageContext, {}, CardProps> = ({
  imageURL,
  lable,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <Box
      position="relative"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Image
        src={imageURL}
        borderRadius="xl"
        filter={isHover ? 'brightness(0.5) saturate(0.8)' : ''}
      />
      {isHover && (
        <Text
          position="absolute"
          top="90%"
          left="30%"
          transform="translate(-50%, -50%)"
          zIndex="2"
          fontSize="2xl"
          color="white"
          fontWeight="bold"
        >
          {lable}
        </Text>
      )}
    </Box>
  )
}

export default Card
