import type { NextComponentType, NextPageContext } from 'next'

import { ReactNode, useRef } from 'react'
import { InputGroup } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FileUploaderProps {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  children?: ReactNode
}

const FileUploader: NextComponentType<
  NextPageContext,
  {},
  FileUploaderProps
> = ({ register, accept, multiple, children }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void
  }

  const handleClick = () => inputRef.current?.click()

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
      />
      <>{children}</>
    </InputGroup>
  )
}

export default FileUploader
