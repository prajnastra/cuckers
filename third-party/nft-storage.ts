import { NFTStorage } from 'nft.storage'

var NftStorageClientCache: any = {}

function createStorageClient(apiKey: string) {
  return new NFTStorage({ token: apiKey })
}

function getStorageClient(apiKey: string) {
  if (!(apiKey in NftStorageClientCache)) {
    NftStorageClientCache[apiKey] = createStorageClient(apiKey)
  }
  return NftStorageClientCache[apiKey]
}

export function uploadFromFileInput(apiKey: string, fileBody: any) {
  return getStorageClient(apiKey).storeBlob(fileBody)
}
