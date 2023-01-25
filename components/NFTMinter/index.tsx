import type { NextComponentType } from 'next'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Icon,
  Stack,
} from '@chakra-ui/react'
import { FiFile } from 'react-icons/fi'

import FileUploader from '../FileUploader'

import { useIpfsFileUploader } from '../../hooks/useIpfsFileUploader'
import {
  generatePolicyScriptAndKey,
  performMintTxn,
  getIpfsLink,
} from '../../utils'
import useWalletConnector from '../../hooks/useWalletConnector'

interface FormValues {
  file: FileList
  name: string
  private_key: string
}

const NFTMinter: NextComponentType = () => {
  const { uploadToIpfs, isLoading, error, fileHash } = useIpfsFileUploader()
  const { connectNami, wallet } = useWalletConnector()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>()

  const handlePolicyAndKey = () => {
    const result = generatePolicyScriptAndKey()
    setValue('private_key', result)
  }

  const handleUploadFile = async () => {
    const files = getValues('file')
    const file = files[0]
    const apiKey = process.env.NFTSTORAGE_KEY

    if (!apiKey || !file) return

    await uploadToIpfs(apiKey, file)
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log('On Submit: ', data)
    console.log(fileHash)
    const blockforestKey = process.env.BLOCKFOREST_KEY
    const ipfsLink = getIpfsLink(fileHash)
    if (!blockforestKey || !ipfsLink || !wallet || !fileHash) {
      alert('validation failed...')
      return
    }
    performMintTxn(
      blockforestKey,
      wallet,
      data.name,
      ipfsLink,
      fileHash,
      data.private_key,
      undefined
    )
  })

  useEffect(() => {
    if (error) {
      alert(error)
    }
    if (fileHash) {
      alert('File uploaded')
      console.log(fileHash)
    }
  }, [error, fileHash])

  return (
    <Flex
      p={8}
      flex={1}
      align={'center'}
      justify={'center'}
      onSubmit={onSubmit}
      as="form"
    >
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Heading fontSize={'2xl'}>Mint NFT 🖼️</Heading>

        {!wallet ? (
          <Button onClick={connectNami}>Connect Nami</Button>
        ) : (
          <>
            <FormControl id="nft-name" isInvalid={errors.name ? true : false}>
              <FormLabel>NFT Name</FormLabel>
              <Input
                type="text"
                placeholder="Give your NFT a name!"
                {...register('name', {
                  required: 'Please give your NFT a name...',
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              id="private-key"
              isInvalid={errors.private_key ? true : false}
            >
              <FormLabel>Private Key</FormLabel>
              <Textarea
                placeholder="Generate key"
                isDisabled={true}
                {...register('private_key', {
                  required: 'Please generate key...',
                })}
              />
              <FormErrorMessage>
                {errors.private_key && errors.private_key.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.file} isRequired>
              <FormLabel>Attachment</FormLabel>

              <FileUploader
                accept={'image/*'}
                multiple
                register={register('file', {
                  required: 'Please upload a file...',
                })}
              >
                <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
              </FileUploader>

              <FormErrorMessage>
                {errors.file && errors.file.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={3} direction={['column', 'row']}>
              {watch('private_key') ? (
                <>
                  {fileHash ? (
                    <Button
                      colorScheme="purple"
                      variant="solid"
                      w="100%"
                      type="submit"
                    >
                      Mint now 🚀
                    </Button>
                  ) : (
                    <Button
                      colorScheme="purple"
                      variant="solid"
                      w="100%"
                      isLoading={isLoading}
                      type="button"
                      onClick={handleUploadFile}
                    >
                      Upload File
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  colorScheme="gray"
                  variant="solid"
                  w="100%"
                  onClick={handlePolicyAndKey}
                  type="button"
                >
                  Generate key 🔑
                </Button>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Flex>
  )
}

export default NFTMinter
