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
    <Flex flex={1}>
      <Image alt="Cuckers banner" objectFit="cover" src={url} />
    </Flex>
  )
}

export default ImageSidebar
