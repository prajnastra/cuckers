import type { NextComponentType, NextPageContext } from 'next'

import { Flex, Image } from '@chakra-ui/react'

interface ImageSlidebarProps {
  url: string
}

const ImageSidebar: NextComponentType<
  NextPageContext,
  {},
  ImageSlidebarProps
> = ({ url }) => {
  return (
    <Flex flex={1} pos="relative">
      <Image
        alt="Cuckers banner"
        objectFit="cover"
        src={url}
        pos="absolute"
        bottom={0}
      />
    </Flex>
  )
}

export default ImageSidebar
