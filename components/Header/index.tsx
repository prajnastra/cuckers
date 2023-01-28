import type { NextComponentType } from 'next'

import { useState } from 'react'
import { Stack, Heading } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionHeading = motion(Heading)

const Header: NextComponentType = () => {
  const [showTitle, setShowTitle] = useState<boolean>(false)

  setTimeout(() => {
    setShowTitle(true)
  }, 4000)

  return (
    <Stack
      height="40vh"
      justify="center"
      p={{
        base: '1rem',
        lg: '1rem 20rem',
      }}
    >
      <AnimatePresence>
        {showTitle && (
          <MotionHeading
            as="h4"
            size="md"
            textAlign="center"
            fontFamily="Be Vietnam Pro"
            opacity="0.3"
            fontWeight="600"
          >
            Meet The Cuckers
          </MotionHeading>
        )}
      </AnimatePresence>

      <Heading
        as="h2"
        size="lg"
        textAlign="center"
        fontFamily="Be Vietnam Pro"
        fontWeight="500"
        lineHeight="1.4"
      >
        The Original NFT for the Cuckers Community
      </Heading>
    </Stack>
  )
}

export default Header
