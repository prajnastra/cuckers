import type { NextComponentType, NextPageContext } from 'next'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Text, Image } from '@chakra-ui/react'

interface CardProps {
  imageURL: string
  lable: string
}

const MotionBox = motion(Box)

const Card: NextComponentType<NextPageContext, {}, CardProps> = ({
  imageURL,
  lable,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <MotionBox
      position="relative"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      display="none"
      animate={{ y: -50, display: 'block' }}
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
          fontFamily="Be Vietnam Pro"
        >
          {lable}
        </Text>
      )}
    </MotionBox>
  )
}

export default Card
